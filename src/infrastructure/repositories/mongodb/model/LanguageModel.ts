import mongoose, { Document, Schema } from 'mongoose';

interface LanguageDocument extends Document {
  id: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}

const languageSchema = new Schema<LanguageDocument>(
  {
    id: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
  },
  { timestamps: false } // Disable Mongoose's default timestamps behavior
);

const LanguageModel = mongoose.model<LanguageDocument>('Language', languageSchema);

export default LanguageModel;
