import type { Expense } from "../../infra/database/kysely/types/types.js";

export interface ExpenseRepository {
  findAll(): Promise<Expense[]>;
  findById(id: number): Promise<Expense | null>;
  create(data: Omit<Expense, "id" | "createdAt" | "updatedAt">): Promise<void>;
  update(
    id: number,
    data: Partial<Omit<Expense, "id" | "createdAt" | "updatedAt">>,
  ): Promise<void>;
  delete(id: number): Promise<void>;
}
