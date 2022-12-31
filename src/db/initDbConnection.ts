import { AppDataSource } from "./dataSource"

export const initDbConnection = async () => {
  try {
    await AppDataSource.initialize()
    console.log("Data Source has been initialized!")
  } catch (err) {
    console.log(`Error during Data source initialization: ${err}`)
  }
  return null
}
