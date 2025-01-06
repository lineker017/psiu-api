import { db } from '@database/client'
import { Request, Response } from 'express'

interface Params {
  reactionId: string
}

export async function deletePostReaction(
  request: Request<Params>,
  response: Response,
) {
  const { studentId } = request
  const { reactionId } = request.params

  const reaction = db.findUnique('posts_reactions', { id: reactionId })

  if (!reaction) {
    response.status(400).json({
      result: 'error',
      message: 'Reação não encontrada',
    })

    return
  }

  if (reaction.studentId !== studentId) {
    response.status(401).json({
      result: 'error',
      message: 'Operação não autorizada',
    })

    return
  }

  db.delete('posts_reactions', reactionId)

  response.json({
    result: 'success',
    message: 'Reação removida',
  })
}
