import UUID from "../id/uuid";

export class Phrases {
  id: string;
  phrases: Array<object>[];
  created_at: Date;
  updated_at: Date | null = null;

  constructor(id: string, phrases: Array<object>[], updated_at: Date) {
    this.id = id;
    this.phrases = phrases;
    this.created_at = new Date();
    this.updated_at = updated_at;
  }

  static create(phrases: Array<object>[]) {
    const id = UUID.create();
    const currentTime = new Date();
    return new Phrases(id, phrases, currentTime);
  }
}
