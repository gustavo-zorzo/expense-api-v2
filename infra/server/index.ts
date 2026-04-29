import "reflect-metadata";
import Fastify, { type FastifyError, type FastifyReply, type FastifyRequest } from "fastify";
import { container } from "../di/container.js";
import { TYPES } from "../../app/di/types.js";
import { ExpenseController } from "../controller/ExpenseController.js";
import { ExpenseNotFoundException } from "../../app/exceptions/ExpenseNotFoundException.js";
import { ZodError } from "zod";

async function main() {
  const fastify = Fastify({ logger: true });
  fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ExpenseNotFoundException) {
      reply.status(404).send({ error: error.name, message: error.message });
    } else if (error instanceof ZodError) {
      reply.status(400).send({ error: error.name, message: error.issues });
    } else {
      reply.status(500).send({ error: error.name, message: error.message });
    }
  });
  const expenseController = container.get<ExpenseController>(TYPES.ExpenseController);
  expenseController.registerRouter(fastify);
  const port = process.env.PORT ? Number(process.env.PORT) : 3008;
  await fastify.listen({ port, host: "0.0.0.0" });
}
main();
