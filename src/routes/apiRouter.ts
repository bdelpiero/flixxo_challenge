import { validate } from "class-validator"
import { Router } from "express"
import authController from "../controllers/auth.controller"
import tokenController from "../controllers/token.controller"
import tokenPriceController from "../controllers/tokenPrice.controller"
import { UserDTO } from "../dtos/auth.dto"
import { TokenDTO, TokenUpdateDTO } from "../dtos/token.dto"
import { TokenPriceDTO } from "../dtos/tokenPrice.dto"
import { User } from "../entities/user.entity"
import { auth } from "../middleware/auth"
import { validateBody } from "../middleware/validateBody"

const router = Router()

router.post("/register", validateBody(UserDTO), authController.register)
router.post("/login", validateBody(UserDTO), authController.login)

router.get("/token", tokenController.getToken)
router.post("/token", validateBody(TokenDTO), auth, tokenController.createToken)
router.put("/token", validateBody(TokenUpdateDTO), auth, tokenController.updateToken)
router.get("/tokens", tokenController.getAllTokens)

router.get("/price", tokenPriceController.getTokenPrice)
router.post("/price", validateBody(TokenPriceDTO), auth, tokenPriceController.createTokenPrice)
router.get("/prices", tokenPriceController.getTokenHistoricalPrices)

export default router
