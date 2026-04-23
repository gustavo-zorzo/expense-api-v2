import { injectable, inject } from "inversify";
import { TYPES } from "../../app/di/types.js";
import type { CreateExpenseUseCase } from "../../app/usecases/CreateExpenseUseCase.js";
import type { ListExpensesUseCase } from "../../app/usecases/ListExpensesUseCase.js";
import type { FindExpenseByIdUseCase } from "../../app/usecases/FindExpenseByIdUseCase.js";
import type { UpdateExpenseUseCase } from "../../app/usecases/UpdateExpenseUseCase.js";
import type { DeleteExpenseUseCase } from "../../app/usecases/DeleteExpenseUseCase.js";
import type { FastifyInstance } from "fastify";
import type { ExpenseCreationProps, ExpenseUpdateProps } from "../../domain/entities/Expense.js";

@injectable()
export class ExpenseController {
  constructor(
    @inject(TYPES.CreateExpense) private createExpense: CreateExpenseUseCase,
    @inject(TYPES.ListExpenses) private listExpense: ListExpensesUseCase,
    @inject(TYPES.FindExpenseById) private findExpenseById: FindExpenseByIdUseCase,
    @inject(TYPES.UpdateExpense) private updateExpense: UpdateExpenseUseCase,
    @inject(TYPES.DeleteExpense) private deleteExpense: DeleteExpenseUseCase,
  ) {}
  registerRouter(fastify: FastifyInstance) {
    fastify.post<{ Body: ExpenseCreationProps }>("/expenses", async (request, reply) => {
      await this.createExpense.execute(request.body);
      reply.status(201).send();
    });
    fastify.get("/expenses", async (request, reply) => {
      reply.status(200).send({ expenses: await this.listExpense.execute() });
    });
    fastify.get<{ Params: { id: string } }>("/expenses/:id", async (request, reply) => {
      reply
        .status(200)
        .send({ expense: await this.findExpenseById.execute(Number(request.params.id)) });
    });
    fastify.put<{ Body: ExpenseUpdateProps; Params: { id: string } }>(
      "/expenses/:id",
      async (request, reply) => {
        reply.status(200).send({
          expense: await this.updateExpense.execute(Number(request.params.id), request.body),
        });
      },
    );
    fastify.delete<{ Params: { id: string } }>("/expenses/:id", async (request, reply) => {
      await this.deleteExpense.execute(Number(request.params.id));
      reply.status(204).send();
    });
  }
}
