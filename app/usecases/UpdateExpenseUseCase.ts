import { inject, injectable } from "inversify";
import { TYPES } from "../di/types.js";
import type { ExpenseRepository } from "../../domain/repositories/ExpenseRepository.js";
import { ExpenseNotFoundException } from "../exceptions/ExpenseNotFoundException.js";
import type { ExpenseUpdateProps } from "../../domain/entities/Expense.js";

@injectable()
export class UpdateExpenseUseCase {
  constructor(@inject(TYPES.ExpenseRepository) private repository: ExpenseRepository) {}
  async execute(id: number, data: ExpenseUpdateProps) {
    const expense = await this.repository.findById(id);
    if (!expense) throw new ExpenseNotFoundException(id);
    await this.repository.update(id, data);
  }
}
