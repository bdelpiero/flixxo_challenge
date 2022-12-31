export interface IToken {
  symbol: string
  name: string
  additionalInfo?: string
}

export interface ITokenPrice {
  tokenSymbol: string
  price: number
}
