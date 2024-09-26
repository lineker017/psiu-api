import { Request, Response } from 'express'

interface Body {
  ra: string
  name: string
  birthdate: string
}

export async function createStudant(
  req: Request,
  res: Response,
): Promise<void> {
  const { ra, birthdate, name } = req.body as Body
  res.json({ data: { ra, birthdate, name } })
}
