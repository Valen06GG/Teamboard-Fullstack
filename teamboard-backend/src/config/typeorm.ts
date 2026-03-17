import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv"
import { registerAs } from "@nestjs/config";

dotenvConfig({path: ".env"});

const isProduction = process.env.NODE_ENV === "production";

const config = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: !isProduction,
    logging: !isProduction,
    ssl: isProduction? { rejectUnauthorized: false } : false,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.js,.ts}"],
};
export default registerAs("typeorm", () => config);

export const connectionSource = new DataSource(config as DataSourceOptions)