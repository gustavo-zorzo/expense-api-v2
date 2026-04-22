import { Container } from "inversify";
import { TYPES } from "../../app/di/types.js";
import { ExpenseController } from "../controller/ExpenseController.js";

export function configureControllers(container: Container): void {
  container.bind<ExpenseController>(TYPES.ExpenseController).to(ExpenseController);
}
