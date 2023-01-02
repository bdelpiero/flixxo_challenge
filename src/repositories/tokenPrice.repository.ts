import { AppDataSource } from "../db/dataSource"
import { TokenPrice } from "../entities/tokenPrice.entity"
import tokenRepository from "./token.repository"

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

const createTokenPrice = async (tokenSymbol: string, priceData: number) => {
  const tokenPriceRepository = AppDataSource.getRepository(TokenPrice)

  const token = await tokenRepository.getToken(tokenSymbol)
  if (!token) {
    throw Error(`Token ${tokenSymbol} does not exist in our database`)
  }

  const price = new TokenPrice()
  price.value = priceData
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
