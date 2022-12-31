import { Request, Response, Router } from "express"
import { appendFile } from "fs"

const router = Router()

router.all("/", (req: Request, res: Response) => res.send("api"))

export default router
