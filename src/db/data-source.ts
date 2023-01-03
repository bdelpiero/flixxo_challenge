import { DataSource, DataSourceOptions } from "typeorm"
import { runSeeders, SeederOptions } from "typeorm-extension"

// TODO: fix port type
const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process?.env?.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  migrations: ["src/migration/*.ts"],
  synchronize: true,
  logging: false,
  subscribers: [],
  seeds: ["src/db/seeds/**/*{.ts,.js}"],
  factories: ["src/db/factories/**/*{.ts,.js}"],
}

export const AppDataSource = new DataSource(options)

export const initDataSource = async () => {
  try {
    const dataSource = await AppDataSource.initialize()
    await runSeeders(dataSource)
    console.log("Data Source has been initialized!")
  } catch (err) {
    console.log(`Error during Data source initialization: ${err}`)
  }
  return null
}
