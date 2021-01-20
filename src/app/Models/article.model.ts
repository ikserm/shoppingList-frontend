export class ArticleModel{
  id ?: number;
  name: string;
  description: string;
  state ?: string;
  date ?: Date;
  quantity: number;

  constructor() {
    this.state = '1';
    this.date = new Date();
    this.quantity = 1;
  }

}
