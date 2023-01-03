import { IsOptional, IsString } from "class-validator"

export class TokenDTO {
  @IsString()
  symbol: string

  @IsString()
  name: string

  @IsString()
  @IsOptional()
  additionalInfo?: string
}

export class TokenUpdateDTO {
  symbol: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  additionalInfo?: string
}
