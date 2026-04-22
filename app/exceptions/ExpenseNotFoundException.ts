export class ExpenseNotFoundException extends Error {
  id: number;
  constructor(id: number) {
    super(`O ID: ${id} não foi encontrado`);
    this.id = id;
    this.name = this.constructor.name;
  }
}
