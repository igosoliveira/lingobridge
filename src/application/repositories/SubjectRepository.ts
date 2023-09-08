import { Subject } from "../../domain/subject/Subject";

export interface SubjectRepository {
  save(subject: Subject): Promise<Subject>;
  findById(id: string): Promise<Subject | null>;
}
