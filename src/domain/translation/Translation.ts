
export class Translation {
    id: number;
    text_id: string;
    language_id: string;
  
    constructor(
      id: number,
      text_id: string,
      language_id: string,
    ) {
      this.id = id;
      this.text_id = text_id;
      this.language_id = language_id;
    }
  }
  