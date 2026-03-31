
export interface CommentRequest {
    content: string,
    articleId: string,
    parentId: string | null
}