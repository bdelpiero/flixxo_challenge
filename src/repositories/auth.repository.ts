import { AppDataSource } from "../db/dataSource"
import { User } from "../entities/user.entity"
import { IUser } from "../types"
import jwt from "jsonwebtoken"

const register = async (userData: IUser) => {
  const { email, password } = userData
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({ where: { email } })
  if (user) {
    throw Error(`Email '${user.email}' already exists`)
  }

  const newUser = new User()
  newUser.email = email
  newUser.password = password
  newUser.hashPassword()
  await userRepository.save(newUser)
}

// TODO: email and password validations. add directly to entity?
export async function login(userData: IUser) {
  const { email, password } = userData
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({ where: { email } })

  if (!user) {
    throw new Error("Email does not exist on our database")
  }

  const isMatch = user.checkIfPasswordMatch(password)

  if (isMatch) {
    const token = jwt.sign({ id: user.id?.toString(), email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2 days",
    })
    return { user: { id: user.id, email }, token: token }
  } else {
    throw new Error("Password is not correct")
  }
}

export default {
  register,
  login,
}
