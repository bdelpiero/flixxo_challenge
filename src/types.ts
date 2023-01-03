export interface IToken {
  symbol: string
  name: string
  additionalInfo?: string
}

export interface ITokenPrice {
  tokenSymbol: string
  value: number
}

export type TokenToUpdate = Partial<IToken> & Pick<IToken, "symbol">

export interface IUser {
  email: string
  password: string
}

export interface ClassType<T> extends Function {
  new (...args: any[]): T
}
