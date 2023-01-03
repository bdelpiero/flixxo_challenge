import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { AppError } from "./utils/AppError"
import { errorHandler } from "./middleware/errorHandler"
import apiRouter from "./routes/apiRouter"
import { initDataSource } from "./db/init"

dotenv.config()

const port = process.env.PORT

initDataSource()
  .then(() => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.get("/ping", (_: Request, res: Response) => res.send("pong"))

    app.use("/api", apiRouter)

    // UNHANDLED ROUTE
    app.all("*", (req: Request, _: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`))
    })

    app.use(errorHandler)

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  })
  .catch((e) => console.error(e))
