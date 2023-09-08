import mongoose, { Schema, Document} from 'mongoose';

interface SubjectDocument  extends Document {
  id: string;
  subject: string;
  created_at: Date;
  updated_at: Date;
}

const subjectSchema = new Schema<SubjectDocument>(
  {
    id: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now },
  },
);

const SubjectModel = mongoose.model<SubjectDocument>('Subject', subjectSchema);

export default SubjectModel;
