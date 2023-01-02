import { Entity, Column, OneToMany, PrimaryGeneratedColumn, BeforeInsert } from "typeorm"
import { TokenPrice } from "./tokenPrice.entity"

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  symbol: string

  @Column()
  name: string

  @Column({
    nullable: true,
    type: "text",
  })
  additionalInfo: string

  @OneToMany(() => TokenPrice, (price) => price.token)
  prices: TokenPrice[]

  @BeforeInsert()
  symbolToUpperCase() {
    this.symbol = this.symbol.toUpperCase()
  }
}
