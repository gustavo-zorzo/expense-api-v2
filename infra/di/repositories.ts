import { Container } from "inversify";
import type { ExpenseRepository } from "../../domain/repositories/ExpenseRepository.js";
import { TYPES } from "../../app/di/types.js";
import { KyselyExpenseRepository } from "../database/kysely/KyselyExpenseRepository.js";

export function configureRepositories(container: Container): void {
  container.bind<ExpenseRepository>(TYPES.ExpenseRepository).to(KyselyExpenseRepository);
}
