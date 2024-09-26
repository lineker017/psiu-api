import { Router } from 'express'

import { createStudant } from './create-studant'

const userRouter = Router()

userRouter.post('/', createStudant)

export { userRouter }
