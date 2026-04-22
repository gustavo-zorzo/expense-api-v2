import type { Expense, ExpenseCreationProps, ExpenseUpdateProps } from "../entities/Expense.js";

export interface ExpenseRepository {
  findAll(): Promise<Expense[]>;
  findById(id: number): Promise<Expense | null>;
  create(data: ExpenseCreationProps): Promise<void>;
  update(id: number, data: ExpenseUpdateProps): Promise<void>;
  delete(id: number): Promise<void>;
}
