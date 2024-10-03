import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  id: string
}

interface Body {
  name: string
  birthdate: string
}

export async function updatedStudent(
  request: Request<Params>,
  response: Response,
): Promise<void> {
  const { id } = request.params
  const { birthdate, name } = request.body as Body

  const student = db.findUnique('students', { id })

  if (!student) {
    response.status(400).json({
      result: 'error',
      message: 'student not found',
    })

    return
  }

  db.updated('students', id, {
    name,
    birthdate: new Date(birthdate),
    updatedAt: new Date(),
  })

  response.json({
    result: 'Success',
    message: 'Student upated',
  })
}
