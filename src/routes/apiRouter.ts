import { Router } from "express"
import tokenController from "../controllers/token.controller"

const router = Router()

router.get("/token", tokenController.getToken)
router.post("/token", tokenController.createToken)
router.get("/tokens", tokenController.getAllTokens)

export default router
