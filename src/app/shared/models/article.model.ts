export interface ArticleJSON {
  author: string;
  createdAt: string;
  description: string;
  id: string;
  keyId: string;
}

export class Article {
  author: string;
  createdAt: Date;
  description: string;
  id: string;
  keyId: string;

  constructor(object?: any) {
    this.author = object.author;
    this.createdAt = object.createdAt && new Date(object.createdAt);
    this.id = object.id;
    this.description = object.description;
    this.keyId = object.keyId;
  }

  static fromJSON(json?: ArticleJSON): Article {
    return new Article(json);
  }

  isEqual() {}
}
