import { Router } from "express"
import tokenController from "../controllers/token.controller"
import tokenPriceController from "../controllers/tokenPrice.controller"

const router = Router()

router.get("/token", tokenController.getToken)
router.post("/token", tokenController.createToken)
// TODO: update token route
router.get("/tokens", tokenController.getAllTokens)

router.get("/price", tokenPriceController.getTokenPrice)
router.post("/price", tokenPriceController.createTokenPrice)
router.get("/prices", tokenPriceController.getTokenHistoricalPrices)

export default router
