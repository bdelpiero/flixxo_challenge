import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { TokenPrice } from "./tokenPrice.entity"

@Entity()
export class Token {
  @PrimaryColumn()
  symbol: string

  @Column()
  name: string

  @Column("text")
  additionalInfo: string

  @OneToMany(() => TokenPrice, (price) => price.token)
  prices: TokenPrice[]
}
