import { Router } from 'express'

import { createStudent } from './create-student'
import { getStudents } from './get-students'
import { inactivateStudent } from './inactivate-student'
import { updatedStudent } from './updated-student'

const userRouter = Router()

userRouter.post('/', createStudent)
userRouter.get('/', getStudents)
userRouter.put('/:id', updatedStudent)
userRouter.delete('/:id', inactivateStudent)

export { userRouter }
