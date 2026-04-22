import { inject, injectable } from "inversify";
import { TYPES } from "../di/types.js";
import type { ExpenseRepository } from "../../domain/repositories/ExpenseRepository.js";
import { ExpenseNotFoundException } from "../exceptions/ExpenseNotFoundException.js";

@injectable()
export class DeleteExpenseUseCase {
  constructor(@inject(TYPES.ExpenseRepository) private repository: ExpenseRepository) {}
  async execute(id: number) {
    const expense = await this.repository.findById(id);
    if (!expense) throw new ExpenseNotFoundException(id);
    await this.repository.delete(id);
  }
}
