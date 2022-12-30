import express, { Request, Response } from "express"
import cors from "cors"
import { AppDataSource } from "./data-source"
import dotenv from "dotenv"

dotenv.config()

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/ping", (req: Request, res: Response) => res.send("pong"))

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
