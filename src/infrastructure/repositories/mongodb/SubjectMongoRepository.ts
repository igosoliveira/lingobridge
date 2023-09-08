import { SubjectRepository } from "../../../application/repositories/SubjectRepository";
import { Subject } from "../../../domain/subject/Subject";
import SubjectModel from "./model/SubjectModel";

export class SubjectMongoRepository implements SubjectRepository {
  findOne(subject: string): Promise<Subject | null> {
    return SubjectModel.findOne({ subject });
  }
  save(subject: Subject): Promise<Subject> {
    return SubjectModel.create(subject);
  }
}
