import type { ExpenseRepository } from "../../../domain/repositories/ExpenseRepository.js";
import { TYPES } from "../../../app/di/types.js";
import { inject, injectable } from "inversify";
import type { DB } from "./types/types.js";
import type { Kysely, Selectable } from "kysely";
import type {
  ExpenseCreationProps,
  ExpenseUpdateProps,
  Expense,
} from "../../../domain/entities/Expense.js";
import type { Expense as KyselyExpense } from "./types/types.js";

@injectable()
export class KyselyExpenseRepository implements ExpenseRepository {
  constructor(@inject(TYPES.Kysely) private db: Kysely<DB>) {}

  private queryCleaner(query: Selectable<KyselyExpense>): Expense {
    const cleanedQuery = {
      id: query.id,
      title: query.title,
      amount: query.amount,
      category: query.category,
      date: query.date,
      createdAt: query.createdAt,
      updatedAt: query.updatedAt,
    };
    return cleanedQuery;
  }

  async findAll() {
    const query = await this.db.selectFrom("Expense").selectAll().execute();
    return query.map((expense) => this.queryCleaner(expense));
  }
  async findById(id: number) {
    const query = await this.db.selectFrom("Expense").where("id", "=", id).selectAll().execute();
    const queryLimpa = query.map((expense) => this.queryCleaner(expense));
    return queryLimpa?.[0] ?? null;
  }
  async create(data: ExpenseCreationProps) {
    await this.db.insertInto("Expense").values(data).execute();
  }
  async update(id: number, data: ExpenseUpdateProps) {
    await this.db.updateTable("Expense").set(data).where("id", "=", id).execute();
  }
  async delete(id: number) {
    await this.db.deleteFrom("Expense").where("id", "=", id).execute();
  }
}
