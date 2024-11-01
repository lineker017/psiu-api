import { db } from '@database/client'
import { Request, Response } from 'express'

export async function getPosts(
  request: Request,
  response: Response,
): Promise<void> {
  const posts = db.findMany('posts', { active: true })

  const postsResponse = posts.map((post) => {
    const comments = db.findMany('comments', { postId: post.id, active: true })
    const reactions = db.findMany('posts_reactions', { postId: post.id })

    const summaryComments = comments.map((comment) => {
      const reactions = db.findMany('comments_reactions', {
        commentId: comment.id,
      })

      const summaryReactions = reactions.map((reaction) => ({
        id: reaction.id,
        postId: reaction.postId,
        type: reaction.type,
        reactedAt: reaction.reactedAt,
      }))

      return {
        id: comment.id,
        postId: comment.postId,
        content: comment.content,
        commentedAt: comment.commentedAt,
        updatedAt: comment.updatedAt,
        reactions: summaryReactions,
      }
    })

    const summaryReactions = reactions.map((reaction) => ({
      id: reaction.id,
      postId: reaction.postId,
      type: reaction.type,
      reactedAt: reaction.reactedAt,
    }))

    const summaryPost = {
      id: post.id,
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
