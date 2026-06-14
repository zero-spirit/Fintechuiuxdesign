import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;        // device-based UUID from frontend
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  investmentGoal: string;
  monthlyInvestment: number;
  darkMode: boolean;
  notifications: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true, index: true },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String },
  avatar: { type: String },
  riskProfile: { type: String, enum: ['conservative', 'moderate', 'aggressive'], default: 'moderate' },
  investmentGoal: { type: String, default: 'Long-term wealth creation' },
  monthlyInvestment: { type: Number, default: 10000 },
  darkMode: { type: Boolean, default: true },
  notifications: { type: Boolean, default: true },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
