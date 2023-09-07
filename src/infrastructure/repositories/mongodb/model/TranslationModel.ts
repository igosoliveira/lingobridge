import mongoose, { Document, Schema } from 'mongoose';

interface TranslationDocument extends Document {
  id: string;
  source_text_id: string;
  translation_text_id: string;
  language_id: string;
  created_at: Date;
  updated_at: Date;
}

const translationSchema = new Schema<TranslationDocument>(
  {
    id: { type: String, required: true, unique: true },
    source_text_id: { type: String, required: true },
    translation_text_id: { type: String, required: true },
    language_id: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
  },
  { timestamps: false } // Disable Mongoose's default timestamps behavior
);

const TranslationModel = mongoose.model<TranslationDocument>('Translation', translationSchema);

export default TranslationModel;
