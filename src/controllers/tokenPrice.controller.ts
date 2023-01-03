import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"
import tokenPriceService from "../services/tokenPrice.service"
import { TokenPriceDTO } from "../dtos/tokenPrice.dto"

const getTokenPrice = async (req: Request, res: Response, next: NextFunction) => {
  const tokenSymbol = req.query.symbol as string

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

const createTokenPrice = async (req: Request, res: Response, next: NextFunction) => {
  const tokenData = req.body as TokenPriceDTO

  try {
    const token = await tokenPriceService.createTokenPrice(tokenData)
    res.send(token)
  } catch (error) {
    return next(new AppError(500, error))
  }
}

const getTokenHistoricalPrices = async (req: Request, res: Response, next: NextFunction) => {
  const tokenSymbol = req.query.symbol as string

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
