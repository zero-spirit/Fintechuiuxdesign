import mongoose, { Schema, Document } from 'mongoose';

export interface IIPOAlert extends Document {
  userId: string;
  watchedIPOs: string[];   // IPO IDs
  updatedAt: Date;
}

const IPOAlertSchema = new Schema<IIPOAlert>({
  userId: { type: String, required: true, unique: true, index: true },
  watchedIPOs: [{ type: String }],
}, { timestamps: true });

export const IPOAlert = mongoose.models.IPOAlert || mongoose.model<IIPOAlert>('IPOAlert', IPOAlertSchema);
