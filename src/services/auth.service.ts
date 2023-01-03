import { UserDTO } from "../dtos/auth.dto"
import authRepository from "../repositories/auth.repository"

const register = async (user: UserDTO) => {
  return await authRepository.register(user)
}

const login = async (user: UserDTO) => {
  return await authRepository.login(user)
}

export default {
  register,
  login,
}
