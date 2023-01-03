import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"
import authService from "../services/auth.service"

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  try {
    await authService.register({ email, password })
    res.send("User successfully created.")
  } catch (error) {
    return next(new AppError(500, error))
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  try {
    const user = await authService.login({ email, password })
    res.send(user)
  } catch (error) {
    return next(new AppError(500, error))
  }
}

export default {
  register,
  login,
}
