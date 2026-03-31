import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import type { CommentType } from "./CommentType";
import { getComment, postComment } from "../../services/comment/CommentService";
import useGet from "../../hooks/useFetch";
import type { CommentRequest } from "../../services/comment/type";

const CommentSection = React.memo(({ id }: { id: string }) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const { refetch, loading } = useGet(getComment);
    const { refetch: createComment } = useGet(postComment);

    useEffect(() => {

        const fetchComments = async () => {
            try {
                const res = await refetch({ articleId: id });
                setComments(res.data);
            } catch (error) {
                console.log(error);

            }
        }
        fetchComments();

    }, []);

    const handleComment = async (value: string, parent = null) => {

        if (!id) {
            return;
        }

        const data: CommentRequest = {
            content: value,
            articleId: id,
            parentId: parent
        };

        const res = await createComment(data);
        setComments(prev => [res, ...prev]);
    };
    // 🔹 Like/Unlike (có recursion cho replies)
    const handleLike = (id: string) => {
        const updateLike = (list: CommentType[]): CommentType[] =>
            list.map((c) => {
                if (c.id === id) {
                    return {
                        ...c,
                        isLiked: !c.isLiked,
                        likes: c.isLiked ? c.likes - 1 : c.likes + 1,
                    };
                }
                return {
                    ...c,
                    replies: c.replies ? updateLike(c.replies) : [],
                };
            });

        setComments((prev) => updateLike(prev));
    };

    return (
        <div className="mx-auto">
            <CommentForm onSubmit={handleComment} />
            <CommentList
                comments={comments}
                onLike={handleLike}
                fetchReplies={refetch}
            />
        </div>
    );
});
export default CommentSection;