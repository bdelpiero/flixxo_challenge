import { IsString, IsNumber } from "class-validator"

export class TokenPriceDTO {
  @IsString()
  tokenSymbol: string

  @IsNumber()
  value: number
}
