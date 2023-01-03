import { runSeeders } from "typeorm-extension"
import { AppDataSource } from "./data-source"

export const initDataSource = async () => {
  try {
    const dataSource = await AppDataSource.initialize()
    await runSeeders(dataSource)
    console.log("Data Source has been initialized!")
  } catch (err) {
    console.log(`Error during Data source initialization: ${err}`)
  }
}
