import authRepository from "../repositories/auth.repository"
import { IUser } from "../types"

const register = async (user: IUser) => {
  return await authRepository.register(user)
}

const login = async (user: IUser) => {
  return await authRepository.login(user)
}

export default {
  register,
  login,
}
