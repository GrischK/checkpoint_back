import { DataSource } from "typeorm";
import { entities } from "./entity";

export default new DataSource({
    type: "sqlite",
    database: "checkpoint_back",
    synchronize: true,
    entities,
    logging: ["error"],
});