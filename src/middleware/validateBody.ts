import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { RequestHandler } from "express"

export const validateBody = (type: any): RequestHandler => {
  return async (req, res, next) => {
    try {
      const errors = await validate(plainToInstance(type, req.body))
      if (errors.length > 0) {
        res.status(400).send(errors)
        return
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}
