import mongoose, { Schema, Document } from 'mongoose';

export interface IWatchlistItem {
  symbol: string;
  addedAt: Date;
  alertPrice?: number;
}

export interface IWatchlist extends Document {
  userId: string;
  stocks: IWatchlistItem[];
  updatedAt: Date;
}

const WatchlistSchema = new Schema<IWatchlist>({
  userId: { type: String, required: true, unique: true, index: true },
  stocks: [{
    symbol: { type: String, required: true },
    addedAt: { type: Date, default: Date.now },
    alertPrice: { type: Number },
  }],
}, { timestamps: true });

export const Watchlist = mongoose.models.Watchlist || mongoose.model<IWatchlist>('Watchlist', WatchlistSchema);
