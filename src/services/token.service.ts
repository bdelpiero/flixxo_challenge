import { AppDataSource } from "../db/data-source"
import { TokenDTO, TokenUpdateDTO } from "../dtos/token.dto"
import { Token } from "../entities/token.entity"

const getToken = async (tokenSymbol: string) => {
  const tokenRepository = AppDataSource.getRepository(Token)

  return await tokenRepository.findOneBy({
    symbol: tokenSymbol,
  })
}

const createToken = async (tokenData: TokenDTO) => {
  const tokenRepository = AppDataSource.getRepository(Token)

  const token = new Token()
  token.symbol = tokenData.symbol
  token.name = tokenData.name
  token.additionalInfo = tokenData.additionalInfo || ""

  return await tokenRepository.save(token)
}

const updateToken = async (tokenData: TokenUpdateDTO) => {
  const tokenRepository = AppDataSource.getRepository(Token)
  const { symbol } = tokenData

  const token = await tokenRepository.findOneBy({ symbol: symbol })
  if (!token) {
    throw new Error(`Token ${symbol} does not exist in our database`)
  }

  return await tokenRepository.save({
    id: token.id,
    ...tokenData,
  })
}

const getAllTokens = async () => {
  const tokenRepository = AppDataSource.getRepository(Token)
  return await tokenRepository.find()
}

export default { getToken, createToken, updateToken, getAllTokens }
