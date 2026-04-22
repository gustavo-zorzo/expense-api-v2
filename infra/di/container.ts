import "reflect-metadata";
import { Container } from "inversify";
import { db } from "../database/connection.js";
import { TYPES } from "../../app/di/types.js";
import { configureControllers } from "./controllers.js";
import { configureRepositories } from "./repositories.js";
import { configureUseCases } from "./usecases.js";

export const container = new Container();

container.bind(TYPES.Kysely).toConstantValue(db);

configureRepositories(container);
configureUseCases(container);
configureControllers(container);
