import { Container } from "inversify";
import { CreateExpenseUseCase } from "../../app/usecases/CreateExpenseUseCase.js";
import { TYPES } from "../../app/di/types.js";
import { ListExpensesUseCase } from "../../app/usecases/ListExpensesUseCase.js";
import { FindExpenseByIdUseCase } from "../../app/usecases/FindExpenseByIdUseCase.js";
import { UpdateExpenseUseCase } from "../../app/usecases/UpdateExpenseUseCase.js";
import { DeleteExpenseUseCase } from "../../app/usecases/DeleteExpenseUseCase.js";

export function configureUseCases(container: Container): void {
  container.bind<CreateExpenseUseCase>(TYPES.CreateExpense).to(CreateExpenseUseCase);
  container.bind<ListExpensesUseCase>(TYPES.ListExpenses).to(ListExpensesUseCase);
  container.bind<FindExpenseByIdUseCase>(TYPES.FindExpenseById).to(FindExpenseByIdUseCase);
  container.bind<UpdateExpenseUseCase>(TYPES.UpdateExpense).to(UpdateExpenseUseCase);
  container.bind<DeleteExpenseUseCase>(TYPES.DeleteExpense).to(DeleteExpenseUseCase);
}
