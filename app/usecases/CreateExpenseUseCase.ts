import { inject, injectable } from "inversify";
import { TYPES } from "../di/types.js";
import type { ExpenseRepository } from "../../domain/repositories/ExpenseRepository.js";
import type { ExpenseCreationProps } from "../../domain/entities/Expense.js";

@injectable()
export class CreateExpenseUseCase {
  constructor(@inject(TYPES.ExpenseRepository) private repository: ExpenseRepository) {}
  async execute(data: ExpenseCreationProps) {
    await this.repository.create(data);
  }
}
