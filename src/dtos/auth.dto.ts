import { IsEmail, IsString, Length, MaxLength, MinLength } from "class-validator"

export class UserDTO {
  @IsEmail()
  email: string

  @Length(6, 18)
  password: string
}
