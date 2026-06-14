import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// CORS for all routes
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check
app.get("/make-server-59e47c35/health", (c) => {
  return c.json({ status: "ok" });
});

// ─── Auth: Sign Up with auto email confirmation ───────────────────────────────
app.post("/make-server-59e47c35/auth/signup", async (c) => {
  try {
    const { email, password, fullName } = await c.req.json();
    if (!email || !password) {
      return c.json({ error: "email and password are required" }, 400);
    }
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      user_metadata: { full_name: fullName ?? "" },
      email_confirm: true, // skip email verification since no email server is configured
    });
    if (error) return c.json({ error: error.message }, 400);
    return c.json({ user: data.user });
  } catch (e) {
    console.error("signup error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ─── User Cache Endpoints ─────────────────────────────────────────────────────

// Full snapshot
app.get("/make-server-59e47c35/user/:userId/snapshot", async (c) => {
  try {
    const userId = c.req.param("userId");
    const [profile, watchlist, baskets, ipoAlerts] = await Promise.all([
      kv.get(`user:${userId}:profile`),
      kv.get(`user:${userId}:watchlist`),
      kv.get(`user:${userId}:baskets`),
      kv.get(`user:${userId}:ipo-alerts`),
    ]);
    return c.json({ profile, watchlist, baskets, ipoAlerts });
  } catch (e) {
    console.error("snapshot error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// Profile
app.get("/make-server-59e47c35/user/:userId/profile", async (c) => {
  try {
    const userId = c.req.param("userId");
    const data = await kv.get(`user:${userId}:profile`);
    return c.json({ data });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

app.put("/make-server-59e47c35/user/:userId/profile", async (c) => {
  try {
    const userId = c.req.param("userId");
    const body = await c.req.json();
    const existing = (await kv.get(`user:${userId}:profile`)) as Record<string, unknown> | null;
    const merged = { ...(existing ?? {}), ...body, userId };
    await kv.set(`user:${userId}:profile`, merged);
    return c.json({ data: merged });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// Watchlist
app.get("/make-server-59e47c35/user/:userId/watchlist", async (c) => {
  try {
    const userId = c.req.param("userId");
    const data = await kv.get(`user:${userId}:watchlist`);
    return c.json({ data: data ?? { stocks: [] } });
  } catch (e) {
    return c.json({ data: { stocks: [] }, error: String(e) });
  }
});

app.put("/make-server-59e47c35/user/:userId/watchlist", async (c) => {
  try {
    const userId = c.req.param("userId");
    const body = await c.req.json();
    const payload = { userId, ...body };
    await kv.set(`user:${userId}:watchlist`, payload);
    return c.json({ data: payload });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// Baskets
app.get("/make-server-59e47c35/user/:userId/baskets", async (c) => {
  try {
    const userId = c.req.param("userId");
    const data = await kv.get(`user:${userId}:baskets`);
    return c.json({ data: data ?? { subscribedBaskets: [] } });
  } catch (e) {
    return c.json({ data: { subscribedBaskets: [] }, error: String(e) });
  }
});

app.put("/make-server-59e47c35/user/:userId/baskets", async (c) => {
  try {
    const userId = c.req.param("userId");
    const body = await c.req.json();
    const payload = { userId, ...body };
    await kv.set(`user:${userId}:baskets`, payload);
    return c.json({ data: payload });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// IPO alerts
app.get("/make-server-59e47c35/user/:userId/ipo-alerts", async (c) => {
  try {
    const userId = c.req.param("userId");
    const data = await kv.get(`user:${userId}:ipo-alerts`);
    return c.json({ data: data ?? { watchedIPOs: [] } });
  } catch (e) {
    return c.json({ data: { watchedIPOs: [] }, error: String(e) });
  }
});

app.put("/make-server-59e47c35/user/:userId/ipo-alerts", async (c) => {
  try {
    const userId = c.req.param("userId");
    const body = await c.req.json();
    const payload = { userId, ...body };
    await kv.set(`user:${userId}:ipo-alerts`, payload);
    return c.json({ data: payload });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

// Invalidate user cache
app.delete("/make-server-59e47c35/user/:userId/cache", async (c) => {
  try {
    const userId = c.req.param("userId");
    await Promise.all([
      kv.del(`user:${userId}:profile`),
      kv.del(`user:${userId}:watchlist`),
      kv.del(`user:${userId}:baskets`),
      kv.del(`user:${userId}:ipo-alerts`),
    ]);
    return c.json({ success: true });
  } catch (e) {
    return c.json({ error: String(e) }, 500);
  }
});

Deno.serve(app.fetch);
