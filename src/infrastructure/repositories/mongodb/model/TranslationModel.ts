import mongoose, { Document, Schema } from "mongoose";

interface TranslationDocument extends Document {
  id: string;
  source_id: string;
  translation_id: string;
  source_language_id: string;
  translation_language_id: string;
  phrases_id: string;
  created_at: Date;
  updated_at: Date;
}

const translationSchema = new Schema<TranslationDocument>(
  {
    id: { type: String, required: true, unique: true },
    source_id: { type: String, required: true },
    translation_id: { type: String, required: true },
    source_language_id: { type: String, required: true },
    translation_language_id: { type: String, required: true },
    phrases_id: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
  },
  { timestamps: false } // Disable Mongoose's default timestamps behavior
);

const TranslationModel = mongoose.model<TranslationDocument>(
  "Translation",
  translationSchema
);

export default TranslationModel;
