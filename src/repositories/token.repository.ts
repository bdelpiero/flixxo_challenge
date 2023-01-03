import { AppDataSource } from "../db/data-source"
import { Token } from "../entities/token.entity"
import { IToken, TokenToUpdate } from "../types"

const getToken = async (tokenSymbol: string) => {
  const tokenRepository = AppDataSource.getRepository(Token)

  return await tokenRepository.findOneBy({
    symbol: tokenSymbol,
  })
}

const createToken = async (tokenData: IToken) => {
  const tokenRepository = AppDataSource.getRepository(Token)

  const token = new Token()
  token.symbol = tokenData.symbol
  token.name = tokenData.name
  token.additionalInfo = tokenData.additionalInfo || ""

  return await tokenRepository.save(token)
}

const updateToken = async (tokenData: TokenToUpdate) => {
  const tokenRepository = AppDataSource.getRepository(Token)
  const { symbol } = tokenData

  const token = await tokenRepository.findOneBy({ symbol: symbol })
  if (!token) {
    throw new Error(`Token ${symbol} does not exist in our database`)
  }

  // TODO: improve way of performing this update
  // with a correct dto validation, I could just pass {...tokenData} to the save function
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
