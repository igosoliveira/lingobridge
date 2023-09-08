import { Subject } from "../../domain/subject/Subject";

export interface SubjectRepository {
  save(subject: Subject): Promise<Subject>;
  findOne(subject: string): Promise<Subject | null>;
}
