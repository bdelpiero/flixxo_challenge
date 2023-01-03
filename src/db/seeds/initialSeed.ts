import { DataSource } from "typeorm"
import { Token } from "../../entities/token.entity"
import { Seeder } from "typeorm-extension"
import { TokenPrice } from "../../entities/tokenPrice.entity"
import { faker } from "@faker-js/faker"

// TODO: use factories
export default class InitialDatabaseSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    try {
      const tokenRepository = dataSource.getRepository(Token)

      // workaround for seeding the db only once.
      // the seeding should be handled as a separate script
      if ((await tokenRepository.count()) !== 0) return

      const tokens: Record<string, Token> = {}

      for (let i = 0; i < 5; i++) {
        const token: Token = new Token()
        token.symbol = faker.finance.currencyCode()
        token.name = faker.finance.currencyName()
        token.additionalInfo = faker.lorem.sentence()

        // workaround for preventing faker from generating two tokens with same symbol
        if (tokens[token.symbol]) continue
        tokens[token.symbol] = token
      }

      // Save the tokens to the database
      const savedTokens = await tokenRepository.save(Object.values(tokens))

      const tokenPriceRepository = dataSource.getRepository(TokenPrice)
      const prices: TokenPrice[] = []

      // For each token, create 5 token price entities
      for (const token of savedTokens) {
        for (let i = 0; i < 5; i++) {
          const price: TokenPrice = new TokenPrice()
          price.value = faker.finance.amount()
          price.token = token
          prices.push(price)
        }
      }

      await tokenPriceRepository.save(prices)
    } catch (e: any) {
      console.error("Error seeding the database: ", e)
    }
  }
}
