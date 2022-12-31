import tokenPriceRepository from "../repositories/tokenPrice.repository"
import { ITokenPrice } from "../types"

const getTokenPrice = async (tokenSymbol: string) => {
  return await tokenPriceRepository.getLastTokenPrice(tokenSymbol)
}

const createTokenPrice = async (tokenPrice: ITokenPrice) => {
  const { tokenSymbol, price } = tokenPrice
  return await tokenPriceRepository.createTokenPrice(tokenSymbol, Number(price))
}

const getAllTokenPrices = async (tokenSymbol: string) => {
  return await tokenPriceRepository.getTokenPrices(tokenSymbol)
}

export default {
  getTokenPrice,
  createTokenPrice,
  getAllTokenPrices,
}
