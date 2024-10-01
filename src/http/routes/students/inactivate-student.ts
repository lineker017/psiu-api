import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  id: string
}

export async function inactivateStudent(
  request: Request<Params>,
  response: Response,
): Promise<void> {
  const { id } = request.params

  db.updated('students', id, {
    active: false,
    updatedAt: new Date(),
  })

  response.json({
    result: 'Success',
    message: 'Student inactivated',
  })
}
