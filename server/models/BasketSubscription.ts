import mongoose, { Schema, Document } from 'mongoose';

export interface IBasketSubscription extends Document {
  userId: string;
  subscribedBaskets: string[];  // basket IDs
  updatedAt: Date;
}

const BasketSubscriptionSchema = new Schema<IBasketSubscription>({
  userId: { type: String, required: true, unique: true, index: true },
  subscribedBaskets: [{ type: String }],
}, { timestamps: true });

export const BasketSubscription = mongoose.models.BasketSubscription ||
  mongoose.model<IBasketSubscription>('BasketSubscription', BasketSubscriptionSchema);
