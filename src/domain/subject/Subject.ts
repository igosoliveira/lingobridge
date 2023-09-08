import UUID from "../id/uuid";

export class Subject {
    id: string;
    subject: string;
    created_at: Date;
    updated_at: Date;
  
    constructor(id: string, subject: string, created_at: Date, updated_at: Date) {
      this.id = id;
      this.subject = subject;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  
    static create(subject: string) {
      const idSubject = UUID.create();
      const currentTime = new Date();
      return new Subject(idSubject, subject, currentTime, currentTime);
    }
  }
  