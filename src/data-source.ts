import { DataSource } from "typeorm"

<<<<<<< HEAD
// TODO: fix port type
=======
>>>>>>> 97d4f8332993368af51d99fa0ecf1c293073803a
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process?.env?.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  synchronize: true,
  logging: true,
  subscribers: [],
})
