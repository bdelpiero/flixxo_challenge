import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/AppError"
import tokenService from "../services/token.service"
import { TokenDTO, TokenUpdateDTO } from "../dtos/token.dto"

const getToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokenSymbol = req.query.symbol as string

  if (!tokenSymbol) {
    return next(new AppError(400, "Token symbol not provided"))
  }

  try {
    const token = await tokenService.getToken(tokenSymbol)
    res.send(token)
  } catch (error) {
    return next(new AppError(500, error))
  }
}

const createToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokenData = req.body as TokenDTO

  try {
    const token = await tokenService.createToken(tokenData)
    res.send(token)
  } catch (error) {
    return next(new AppError(500, error))
  }
}

const updateToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokenData = req.body as TokenUpdateDTO

  try {
    const token = await tokenService.updateToken(tokenData)
    res.send(token)
  } catch (error) {
    return next(new AppError(500, error))
  }
}

const getAllTokens = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const tokens = await tokenService.getAllTokens()
    res.send(tokens)
  } catch (error) {
    return next(new AppError(500, error))
  }
}

export default { getToken, createToken, updateToken, getAllTokens }
