export class ArticleModel{
  id ?: number;
  name: string;
  description: string;
  state ?: string;
  date ?: Date;

  constructor() {
    this.state = '1';
    this.date = new Date();
  }

}
