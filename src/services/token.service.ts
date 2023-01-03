import { TokenDTO, TokenUpdateDTO } from "../dtos/token.dto"
import tokenRepository from "../repositories/token.repository"

const getToken = async (tokenSymbol: string) => {
  return await tokenRepository.getToken(tokenSymbol)
}

const createToken = async (token: TokenDTO) => {
  return await tokenRepository.createToken(token)
}

const updateToken = async (token: TokenUpdateDTO) => {
  return await tokenRepository.updateToken(token)
}

const getAllTokens = async () => {
  return await tokenRepository.getAllTokens()
}

export default {
  getToken,
  createToken,
  updateToken,
  getAllTokens,
}
