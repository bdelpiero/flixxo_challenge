import { AppDataSource } from "../db/dataSource"
import { Token } from "../entities/token.entity"
import { IToken } from "../types"

const getToken = async (tokenSymbol: string) => {
  const tokenRepository = AppDataSource.getRepository(Token)

  return await tokenRepository.findOneBy({
    symbol: tokenSymbol,
  })
}

const createToken = async (tokenData: IToken) => {
  const tokenRepository = AppDataSource.getRepository(Token)

  const token = new Token()
  token.symbol = tokenData.symbol.toUpperCase()
  token.name = tokenData.name
  token.additionalInfo = tokenData.additionalInfo || ""

  return await tokenRepository.save(token)
}

const getAllTokens = async () => {
  const tokenRepository = AppDataSource.getRepository(Token)
  return await tokenRepository.find()
}

export default { getToken, createToken, getAllTokens }
