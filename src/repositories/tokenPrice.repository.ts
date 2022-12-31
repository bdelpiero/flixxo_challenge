import { AppDataSource } from "../db/dataSource"
import { Token } from "../entities/token.entity"
import { TokenPrice } from "../entities/tokenPrice.entity"

const getLastTokenPrice = async (tokenSymbol: string) => {
  const tokenPriceRepository = AppDataSource.getRepository(TokenPrice)

  const lastPrice = await tokenPriceRepository
    .createQueryBuilder("tokenPrice")
    .where("tokenPrice.token.symbol = :tokenSymbol", { tokenSymbol })
    .orderBy("tokenPrice.createdAt", "DESC")
    .getOne()

  return lastPrice
}

const createTokenPrice = async (tokenSymbol: string, priceData: number) => {
  const tokenRepository = AppDataSource.getRepository(Token)
  const priceRepository = AppDataSource.getRepository(TokenPrice)

  const token = await tokenRepository.findOneBy({ symbol: tokenSymbol })

  if (!token) {
    throw Error(`Token ${tokenSymbol} doesn't exist in our database`)
  }

  const price = new TokenPrice()
  price.value = priceData
  price.token = token

  return await priceRepository.save(price)
}

const getTokenPrices = async (tokenSymbol: string) => {
  const tokenRepository = AppDataSource.getRepository(Token)
  const tokenPriceRepository = AppDataSource.getRepository(TokenPrice)

  const token = await tokenRepository.findOneBy({ symbol: tokenSymbol })

  if (!token) {
    throw Error(`Token ${tokenSymbol} doesn't exist in our database`)
  }

  const prices = await tokenPriceRepository.find({
    where: {
      token,
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
