export interface IToken {
  symbol: string
  name: string
  additionalInfo?: string
}

export interface ITokenPrice {
  tokenSymbol: string
  price: number
}

export type TokenToUpdate = Partial<IToken> & Pick<IToken, "symbol">

export interface IUser {
  email: string
  password: string
}
