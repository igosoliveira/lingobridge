import { SaveSubject } from "../application/usecases/subject/SaveSubject";
import { SubjectMongoRepository } from "../infrastructure/repositories/mongodb/SubjectMongoRepository";

const subjectRepository = new SubjectMongoRepository();
const saveSubjectUseCase = new SaveSubject(subjectRepository);

export { saveSubjectUseCase };
