import mongoose, { Document, Schema } from 'mongoose';

interface LanguageDocument extends Document {
  id: string;
  code: string;
  emoji: string;
  country: string;
  language: string;
  created_at: Date;
  updated_at: Date;
}

const languageSchema = new Schema<LanguageDocument>(
  {
    id: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    emoji: { type: String, required: false },
    country: { type: String, required: true },
    language: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
  },
  { timestamps: false } // Desativar o comportamento de timestamps padrão do Mongoose
);

const LanguageModel = mongoose.model<LanguageDocument>('Language', languageSchema);

export default LanguageModel;
