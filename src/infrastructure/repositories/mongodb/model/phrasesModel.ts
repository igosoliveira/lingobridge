import mongoose, { Document, Schema } from 'mongoose';

interface IPhrases extends Document {
  id: string;
  phrases: Array<object>;
  source_language_id:  string;
  translation_language_id:  string;
  created_at: Date;
  updated_at: Date | null;
}

const phrasesSchema = new Schema<IPhrases>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    phrases: {
      type: [Schema.Types.Mixed], 
      required: true,
    },
    source_language_id: { type: String, required: true },
    translation_language_id: { type: String, required: true },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: null, 
    },
  },
);

const PhrasesModel = mongoose.model<IPhrases>('Phrases', phrasesSchema);

export default PhrasesModel;
