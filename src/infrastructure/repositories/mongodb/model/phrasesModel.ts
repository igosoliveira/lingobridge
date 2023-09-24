import mongoose, { Document, Schema } from 'mongoose';

interface IPhrases extends Document {
  id: string;
  phrases: Array<object>;
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
