export class CommentOutDto {
  constructor(
    commentId: number,
    content: string,
    userEmail: string,
    userName: string,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
    replies: CommentOutDto[],
    parentCommentId: number | null,
  ) {
    this.commentId = commentId;
    this.content = content;
    this.userEmail = userEmail;
    this.userName = userName;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.replies = replies;
    this.parentCommentId = parentCommentId;
  }

  parentCommentId: number | null;
  commentId: number;
  content: string;
  userEmail: string;
  userName: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  replies: CommentOutDto[];
}
