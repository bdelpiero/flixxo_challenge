import tokenRepository from "../repositories/token.repository"
import { IToken } from "../types"

const getToken = async (tokenSymbol: string) => {
  return await tokenRepository.getToken(tokenSymbol)
}

const createToken = async (token: IToken) => {
  return await tokenRepository.createToken(token)
}

const getAllTokens = async () => {
  return await tokenRepository.getAllTokens()
}

export default {
  getToken,
  createToken,
  getAllTokens,
}
