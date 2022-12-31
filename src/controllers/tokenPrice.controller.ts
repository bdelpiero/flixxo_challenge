import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"
import tokenPriceService from "../services/tokenPrice.service"
import { ITokenPrice } from "../types"

const getTokenPrice = async (req: Request, res: Response, next: NextFunction) => {
  const tokenSymbol = req.query.symbol as string

  // TODO: move to validator middleware?
  if (!tokenSymbol) {
    return next(new AppError(400, "Token symbol not provided"))
  }

  try {
    const token = await tokenPriceService.getTokenPrice(tokenSymbol)
    res.send(token)
  } catch (error) {
    return next(new AppError(500, error))
  }
}

const validateTokenPrice = (tokenPrice: ITokenPrice | null) => tokenPrice.tokenSymbol && tokenPrice.price

const createTokenPrice = async (req: Request, res: Response, next: NextFunction) => {
  const tokenData = req.body as ITokenPrice | null

  // move to validator middleware?
  if (!tokenData) {
    return next(new AppError(400, "No body provided in the request"))
  }
  // TODO: use class-validator and DTO
  // TODO: validate price is a number?
  if (!validateTokenPrice(tokenData)) {
    return next(new AppError(400, "Incorrect request body. Symbol and price are mandatory"))
  }

  try {
    const token = await tokenPriceService.createTokenPrice(tokenData)
    res.send(token)
  } catch (error) {
    return next(new AppError(500, error))
  }
}

const getTokenHistoricalPrices = async (req: Request, res: Response, next: NextFunction) => {
  const tokenSymbol = req.query.symbol as string

  // TODO: move to validator middleware?
  if (!tokenSymbol) {
    return next(new AppError(400, "Token symbol not provided"))
  }

  try {
    const tokens = await tokenPriceService.getAllTokenPrices(tokenSymbol)
    res.send(tokens)
  } catch (error) {
    return next(new AppError(500, error))
  }
}

export default {
  getTokenPrice,
  createTokenPrice,
  getTokenHistoricalPrices,
}
