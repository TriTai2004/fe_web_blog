export interface CommentType {
  id: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  updatedAt: string;
  articleId: string;
  authorId: string;
  parentId: string | null;
  totalReplies: number;
  totalLikes: number;
  likedByCurrentUser: boolean;
  currentPage: number;
  totalItems: number;
  totalPages: number;
  parentAuthorName: string;
}
export interface CommentResponse {
  data: CommentType[];
  currentPage: number,
  totalItems: number,
  totalPages: number
}