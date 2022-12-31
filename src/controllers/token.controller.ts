import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/AppError"
import tokenService from "../services/token.service"
import { IToken } from "../types"

const getToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokenSymbol = req.query.symbol as string

  // move to validator middleware?
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

const validateToken = (token: IToken | null) => token.symbol && token.name

const createToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokenData = req.body as IToken | null

  // move to validator middleware?
  if (!tokenData) {
    return next(new AppError(400, "No body provided in the request"))
  }
  // TODO: use class-validator and DTO
  if (!validateToken(tokenData)) {
    return next(new AppError(400, "Incorrect request body. Symbol and name are mandatory"))
  }

  try {
    const token = await tokenService.createToken(tokenData)
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
export default { getToken, createToken, getAllTokens }