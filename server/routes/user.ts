import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { User } from '../models/User';
import { Watchlist } from '../models/Watchlist';
import { BasketSubscription } from '../models/BasketSubscription';
import { IPOAlert } from '../models/IPOAlert';
import { isMongoConnected } from '../db/mongoose';

const router = Router();

// Supabase client for KV cache (uses service role via env or anon key as fallback)
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://qtsshrodxtzcrxvpoczf.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
);

const KV_TABLE = 'kv_store_59e47c35';

async function kvSet(key: string, value: unknown) {
  try {
    await supabase.from(KV_TABLE).upsert({ key, value });
  } catch { /* cache write failure is non-fatal */ }
}

async function kvGet(key: string): Promise<unknown> {
  try {
    const { data } = await supabase.from(KV_TABLE).select('value').eq('key', key).maybeSingle();
    return data?.value ?? null;
  } catch { return null; }
}

// ─── User Profile ────────────────────────────────────────────────────────────

router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  // 1. Try Supabase KV cache
  const cached = await kvGet(`user:${userId}:profile`);
  if (cached) return res.json({ source: 'cache', data: cached });

  // 2. Fallback to MongoDB
  if (!isMongoConnected()) return res.json({ source: 'default', data: null });

  const user = await User.findOne({ userId }).lean();
  if (user) await kvSet(`user:${userId}:profile`, user);
  return res.json({ source: 'mongo', data: user });
});

router.put('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const update = req.body;

  if (!isMongoConnected()) {
    // Store only in Supabase KV when MongoDB is unavailable
    const existing = (await kvGet(`user:${userId}:profile`)) as Record<string, unknown> | null;
    const merged = { ...(existing ?? {}), ...update, userId };
    await kvSet(`user:${userId}:profile`, merged);
    return res.json({ source: 'cache', data: merged });
  }

  const user = await User.findOneAndUpdate(
    { userId },
    { $set: { ...update, userId } },
    { upsert: true, new: true, runValidators: true }
  ).lean();

  await kvSet(`user:${userId}:profile`, user);
  return res.json({ source: 'mongo', data: user });
});

// ─── Watchlist ────────────────────────────────────────────────────────────────

router.get('/:userId/watchlist', async (req: Request, res: Response) => {
  const { userId } = req.params;

  const cached = await kvGet(`user:${userId}:watchlist`);
  if (cached) return res.json({ source: 'cache', data: cached });

  if (!isMongoConnected()) return res.json({ source: 'default', data: { stocks: [] } });

  const wl = await Watchlist.findOne({ userId }).lean();
  const data = wl ?? { stocks: [] };
  await kvSet(`user:${userId}:watchlist`, data);
  return res.json({ source: 'mongo', data });
});

router.put('/:userId/watchlist', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { stocks } = req.body as { stocks: string[] };

  const stockItems = stocks.map(symbol => ({ symbol, addedAt: new Date() }));

  if (!isMongoConnected()) {
    const data = { userId, stocks: stockItems };
    await kvSet(`user:${userId}:watchlist`, data);
    return res.json({ source: 'cache', data });
  }

  const wl = await Watchlist.findOneAndUpdate(
    { userId },
    { $set: { userId, stocks: stockItems } },
    { upsert: true, new: true }
  ).lean();

  await kvSet(`user:${userId}:watchlist`, wl);
  return res.json({ source: 'mongo', data: wl });
});

// ─── Basket Subscriptions ─────────────────────────────────────────────────────

router.get('/:userId/baskets', async (req: Request, res: Response) => {
  const { userId } = req.params;

  const cached = await kvGet(`user:${userId}:baskets`);
  if (cached) return res.json({ source: 'cache', data: cached });

  if (!isMongoConnected()) return res.json({ source: 'default', data: { subscribedBaskets: [] } });

  const sub = await BasketSubscription.findOne({ userId }).lean();
  const data = sub ?? { subscribedBaskets: [] };
  await kvSet(`user:${userId}:baskets`, data);
  return res.json({ source: 'mongo', data });
});

router.put('/:userId/baskets', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { subscribedBaskets } = req.body as { subscribedBaskets: string[] };

  if (!isMongoConnected()) {
    const data = { userId, subscribedBaskets };
    await kvSet(`user:${userId}:baskets`, data);
    return res.json({ source: 'cache', data });
  }

  const sub = await BasketSubscription.findOneAndUpdate(
    { userId },
    { $set: { userId, subscribedBaskets } },
    { upsert: true, new: true }
  ).lean();

  await kvSet(`user:${userId}:baskets`, sub);
  return res.json({ source: 'mongo', data: sub });
});

// ─── IPO Alerts ───────────────────────────────────────────────────────────────

router.get('/:userId/ipo-alerts', async (req: Request, res: Response) => {
  const { userId } = req.params;

  const cached = await kvGet(`user:${userId}:ipo-alerts`);
  if (cached) return res.json({ source: 'cache', data: cached });

  if (!isMongoConnected()) return res.json({ source: 'default', data: { watchedIPOs: [] } });

  const alert = await IPOAlert.findOne({ userId }).lean();
  const data = alert ?? { watchedIPOs: [] };
  await kvSet(`user:${userId}:ipo-alerts`, data);
  return res.json({ source: 'mongo', data });
});

router.put('/:userId/ipo-alerts', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { watchedIPOs } = req.body as { watchedIPOs: string[] };

  if (!isMongoConnected()) {
    const data = { userId, watchedIPOs };
    await kvSet(`user:${userId}:ipo-alerts`, data);
    return res.json({ source: 'cache', data });
  }

  const alert = await IPOAlert.findOneAndUpdate(
    { userId },
    { $set: { userId, watchedIPOs } },
    { upsert: true, new: true }
  ).lean();

  await kvSet(`user:${userId}:ipo-alerts`, alert);
  return res.json({ source: 'mongo', data: alert });
});

// ─── Full user snapshot (all data in one call) ────────────────────────────────

router.get('/:userId/snapshot', async (req: Request, res: Response) => {
  const { userId } = req.params;

  const [profileRes, watchlistRes, basketsRes, ipoRes] = await Promise.all([
    kvGet(`user:${userId}:profile`),
    kvGet(`user:${userId}:watchlist`),
    kvGet(`user:${userId}:baskets`),
    kvGet(`user:${userId}:ipo-alerts`),
  ]);

  if (profileRes && watchlistRes && basketsRes && ipoRes) {
    return res.json({
      source: 'cache',
      data: { profile: profileRes, watchlist: watchlistRes, baskets: basketsRes, ipoAlerts: ipoRes }
    });
  }

  if (!isMongoConnected()) {
    return res.json({ source: 'default', data: { profile: null, watchlist: { stocks: [] }, baskets: { subscribedBaskets: [] }, ipoAlerts: { watchedIPOs: [] } } });
  }

  const [profile, watchlist, baskets, ipoAlerts] = await Promise.all([
    User.findOne({ userId }).lean(),
    Watchlist.findOne({ userId }).lean(),
    BasketSubscription.findOne({ userId }).lean(),
    IPOAlert.findOne({ userId }).lean(),
  ]);

  const snapshot = {
    profile: profile ?? null,
    watchlist: watchlist ?? { stocks: [] },
    baskets: baskets ?? { subscribedBaskets: [] },
    ipoAlerts: ipoAlerts ?? { watchedIPOs: [] },
  };

  // Populate cache
  await Promise.all([
    kvSet(`user:${userId}:profile`, snapshot.profile),
    kvSet(`user:${userId}:watchlist`, snapshot.watchlist),
    kvSet(`user:${userId}:baskets`, snapshot.baskets),
    kvSet(`user:${userId}:ipo-alerts`, snapshot.ipoAlerts),
  ]);

  return res.json({ source: 'mongo', data: snapshot });
});

export default router;
