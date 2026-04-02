import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import type { CommentType } from "./CommentType";
import { getComment, likeComment, postComment } from "../../services/comment/CommentService";
import useGet from "../../hooks/useFetch";
import type { CommentRequest } from "../../services/comment/type";
import usePost from "../../hooks/usePost";

const CommentSection = React.memo(({ id }: { id: string }) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const { refetch, loading } = useGet(getComment);
    const { refetch: createComment } = usePost(postComment);
    const { refetch: like } = usePost(likeComment);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const size = 10;

    useEffect(() => {

        const fetchComments = async () => {
            try {
                const res = await refetch({ articleId: id, page, size, sort: "createdAt,desc" });
                setComments(prev => ([...prev, ...res.data]));

                setTotalPage(res?.totalPages);

            } catch (error) {
                console.error(error);

            }
        }
        fetchComments();

    }, [page]);

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

    const handleLike = async (comment: CommentType) => {

        try {
            await like({ commentId: comment.id });

        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div className="mx-auto">
            <CommentForm onSubmit={handleComment} />
            <CommentList
                comments={comments}
                onLike={handleLike}
                fetchReplies={refetch}
            />
            {totalPage - 1 > page && (
                <button type="button" onClick={() => setPage(totalPage > page ? page + 1 : totalPage - 1)} disabled={loading} className="text-sm text-center items-center justify-center py-4 flex">
                    {loading ? (
                        <>
                            <span className="block animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full me-2"></span>
                            Đang tải...
                        </>
                    ) : (
                        <span className="text-sm">Xem thêm bình luận</span>
                    )}
                </button>
            )}
        </div>
    );
});
export default CommentSection;