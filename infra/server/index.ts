import "reflect-metadata";
import Fastify from "fastify";
import { container } from "../di/container.js";
import { TYPES } from "../../app/di/types.js";
import { ExpenseController } from "../controller/ExpenseController.js";

async function main() {
  const fastify = Fastify({ logger: true });
  const expenseController = container.get<ExpenseController>(TYPES.ExpenseController);
  expenseController.registerRouter(fastify);
  const port = process.env.PORT ? Number(process.env.PORT) : 3008;
  await fastify.listen({ port, host: "0.0.0.0" });
}
main();
