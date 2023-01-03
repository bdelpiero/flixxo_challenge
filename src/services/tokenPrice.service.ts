import { AppDataSource } from "../db/data-source"
import { TokenPriceDTO } from "../dtos/tokenPrice.dto"
import { TokenPrice } from "../entities/tokenPrice.entity"
import tokenRepository from "./token.service"

const getLastTokenPrice = async (tokenSymbol: string) => {
  const tokenPriceRepository = AppDataSource.getRepository(TokenPrice)

  const token = await tokenRepository.getToken(tokenSymbol)
  if (!token) {
    throw Error(`Token ${tokenSymbol} does not exist in our database`)
  }

  const lastPrice = await tokenPriceRepository
    .createQueryBuilder("tokenPrice")
    .where("tokenPrice.token.id = :tokenId", { tokenId: token.id })
    .orderBy("tokenPrice.createdAt", "DESC")
    .getOne()

  return lastPrice
}

const createTokenPrice = async (tokenPriceData: TokenPriceDTO) => {
  const { tokenSymbol, value } = tokenPriceData
  const tokenPriceRepository = AppDataSource.getRepository(TokenPrice)

  const token = await tokenRepository.getToken(tokenSymbol)
  if (!token) {
    throw Error(`Token ${tokenSymbol} does not exist in our database`)
  }

  const price = new TokenPrice()
  price.value = value.toString()
  price.token = token

  return await tokenPriceRepository.save(price)
}

const getTokenPrices = async (tokenSymbol: string) => {
  const tokenPriceRepository = AppDataSource.getRepository(TokenPrice)

  const token = await tokenRepository.getToken(tokenSymbol)
  if (!token) {
    throw Error(`Token ${tokenSymbol} does not exist in our database`)
  }

  const prices = await tokenPriceRepository.find({
    where: {
      token: { id: token.id },
    },
    order: {
      createdAt: "DESC",
    },
  })

  return prices
}

export default {
  getLastTokenPrice,
  createTokenPrice,
  getTokenPrices,
}
