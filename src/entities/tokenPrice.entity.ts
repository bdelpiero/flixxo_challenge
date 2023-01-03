import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm"
import { Token } from "./token.entity"

@Entity()
export class TokenPrice {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  value: string

  @ManyToOne(() => Token, (token) => token.prices)
  token: Token

  @CreateDateColumn()
  createdAt: Date
}
