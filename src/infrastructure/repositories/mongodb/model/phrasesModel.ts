import mongoose, { Schema, Document } from 'mongoose';

interface IPhrases extends Document {
  id: string
  sentences: Array<object>;
  language_id: string;
  created_at: Date;
  updated_at: Date;
}

const PhrasesSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  sentences: [{ type: Schema.Types.Mixed }], 
  language_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const PhrasesModel = mongoose.model<IPhrases>('Phrases', PhrasesSchema);

export default PhrasesModel;
