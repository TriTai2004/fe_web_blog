import type { CommentResponse, CommentType } from "./CommentType";
import CommentItem from "./CommentItem";

interface Props {
  comments: CommentType[];
  onLike: (id: string) => void;
  fetchReplies: (params: Record<string, unknown>) => Promise<CommentResponse>;

}

const CommentList = ({ comments, onLike, fetchReplies }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
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