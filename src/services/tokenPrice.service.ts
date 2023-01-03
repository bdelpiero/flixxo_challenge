import { TokenPriceDTO } from "../dtos/tokenPrice.dto"
import tokenPriceRepository from "../repositories/tokenPrice.repository"

const getTokenPrice = async (tokenSymbol: string) => {
  return await tokenPriceRepository.getLastTokenPrice(tokenSymbol)
}

const createTokenPrice = async (tokenPrice: TokenPriceDTO) => {
  const { tokenSymbol, value } = tokenPrice
  return await tokenPriceRepository.createTokenPrice(tokenSymbol, value.toLocaleString())
}

const getAllTokenPrices = async (tokenSymbol: string) => {
  return await tokenPriceRepository.getTokenPrices(tokenSymbol)
}

export default {
  getTokenPrice,
  createTokenPrice,
  getAllTokenPrices,
}
