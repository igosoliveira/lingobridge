import { Subject } from "../../../domain/subject/Subject";
import { SubjectRepository } from "../../repositories/SubjectRepository";

export class SaveSubject {
  constructor(readonly subjectRepository: SubjectRepository) {}

  async execute(input: Input): Promise<Output> {
    const subject = Subject.create(input.subject);
    const subjectFound = await this.subjectRepository.findOne(input.subject);
    if (!subjectFound) {
      await this.subjectRepository.save(subject);
      return { id: subject.id };
    }
    return { id: subject.id }
  }
}

type Input = {
  subject: string;
};

type Output = {
  id: string;
};
