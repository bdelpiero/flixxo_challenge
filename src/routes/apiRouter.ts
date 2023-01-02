import { Router } from "express"
import authController from "../controllers/auth.controller"
import tokenController from "../controllers/token.controller"
import tokenPriceController from "../controllers/tokenPrice.controller"
import { auth } from "../middleware/auth"

const router = Router()

router.post("/register", authController.register)
router.post("/login", authController.login)

router.get("/token", tokenController.getToken)
router.post("/token", auth, tokenController.createToken)
router.put("/token", auth, tokenController.updateToken)
router.get("/tokens", tokenController.getAllTokens)

router.get("/price", tokenPriceController.getTokenPrice)
router.post("/price", auth, tokenPriceController.createTokenPrice)
router.get("/prices", tokenPriceController.getTokenHistoricalPrices)

export default router
