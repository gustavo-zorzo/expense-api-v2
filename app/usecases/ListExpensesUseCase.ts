import { inject, injectable } from "inversify";
import { TYPES } from "../di/types.js";
import type { ExpenseRepository } from "../../domain/repositories/ExpenseRepository.js";

@injectable()
export class ListExpensesUseCase {
  constructor(@inject(TYPES.ExpenseRepository) private repository: ExpenseRepository) {}
  async execute() {
    return await this.repository.findAll();
  }
}
