import mongoose, { Document, Schema } from "mongoose";

interface Text {
  id: string;
  phrases_id: string;
  language_id: string;
}

interface TranslationDocument extends Document {
  id: string;
  text: Text;
  translation: Text;
  created_at: Date;
  updated_at: Date | null;
}

const translationSchema = new Schema<TranslationDocument>(
  {
    id: { type: String, required: true, unique: true },
    text: {
      id: { type: String, required: true },
      phrases_id: { type: String, required: true },
      language_id: { type: String, required: true },
    },
    translation: {
      id: { type: String, required: true },
      phrases_id: { type: String, required: true },
      language_id: { type: String, required: true },
    },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
  },
  { timestamps: false } 
);

const TranslationModel = mongoose.model<TranslationDocument>(
  "Translation",
  translationSchema
);

export default TranslationModel;
