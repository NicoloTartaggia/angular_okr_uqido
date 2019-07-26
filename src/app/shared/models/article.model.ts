export interface ArticleJSON {
  date: string;
  id: string;
  title: string;
}

export class Article {
  date: Date;
  id: string;
  title: string;

  constructor(object?: any) {
    this.date = object.date && new Date(object.date);
    this.id = object.id;
    this.title = object.title;
  }

  static fromJSON(json?: ArticleJSON): Article {
    return new Article(json);
  }
}
