import mongoose, { Document, Schema } from 'mongoose';

interface TextDocument extends Document {
  id: string;
  title: string;
  content: string;
  audio_url: string;
  language_id: string;
  created_at: Date;
  updated_at: Date;
}

const textSchema = new Schema<TextDocument>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    audio_url: { type: String, required: false },
    language_id: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
  },
  { timestamps: false } // Disable Mongoose's default timestamps behavior
);

const TextModel = mongoose.model<TextDocument>('Text', textSchema);

export default TextModel;
