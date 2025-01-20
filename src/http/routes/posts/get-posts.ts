import { prisma } from '@lib/prisma'
import { Request, Response } from 'express'

export async function getPosts(
  request: Request,
  response: Response,
): Promise<void> {
  const { studentId } = request

  const posts = await prisma.post.findMany({
    where: {
      active: true,
    },
  })

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  const postsResponse = sortedPosts.map(async (post) => {
    const comments = await prisma.comment.findMany({
      where: {
        id: post.id,
        active: true,
      },
    })

    const reactions = await prisma.postReaction.findMany({
      where: {
        id: post.id,
      },
    })

    const summaryComments = comments.map(async (comment) => {
      const reactions = await prisma.commentReaction.findMany({
        where: {
          commentId: comment.id,
        },
      })

      const summaryReactions = reactions.map((reaction) => ({
        id: reaction.id,
        postId: post.id,
        isOwner: reaction.ownerId === studentId,
        type: reaction.type,
        reactedAt: reaction.reactedAt,
      }))

      return {
        id: comment.id,
        postId: comment.postId,
        isOwner: comment.ownerId === studentId,
        content: comment.content,
        commentedAt: comment.commentedAt,
        updatedAt: comment.updatedAt,
        reactions: summaryReactions,
      }
    })

    const summaryReactions = reactions.map((reaction) => ({
      id: reaction.id,
      postId: reaction.postId,
      isOwner: reaction.ownerId === studentId,
      type: reaction.type,
      reactedAt: reaction.reactedAt,
    }))

    const summaryPost = {
      id: post.id,
      isOwner: post.ownerId === studentId,
      content: post.content,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    }

    return {
      ...summaryPost,
      comments: summaryComments,
      reactions: summaryReactions,
    }
  })

  response.json({
    result: 'success',
    data: postsResponse,
  })
}
