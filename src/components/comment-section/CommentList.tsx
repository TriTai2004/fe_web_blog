import type { CommentResponse, CommentType } from "./CommentType";
import CommentItem from "./CommentItem";

interface Props {
  comments: CommentType[];
  onLike: (comment: CommentType) => void;
  fetchReplies: (params: Record<string, unknown>) => Promise<CommentResponse>;

}

const CommentList = ({ comments, onLike, fetchReplies }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {comments.map((comment, index) => (
        <CommentItem
          key={comment.id + index}
          comment={comment}
          onLike={onLike}
          fetchReplies={fetchReplies}
          depth={0}
        />
      ))}
    </div>
  );
};

export default CommentList;