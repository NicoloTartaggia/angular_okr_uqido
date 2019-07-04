export class Key {
  description: string;
  evaluationType: string;
  limit?: number; // optional, used in case evaluationType === 'limit'
}
