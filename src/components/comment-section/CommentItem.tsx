import { useState } from "react";
import type { CommentResponse, CommentType } from "./CommentType";
import { BiLike, BiMessageRounded } from "react-icons/bi";
import type { CommentRequest } from "../../services/comment/type";
import { postComment } from "../../services/comment/CommentService";
import useGet from "../../hooks/useFetch";
import type { AxiosResponse } from "axios";
import CommentForm from "./CommentForm";

interface Props {
    comment: CommentType;
    onLike: (comment: CommentType) => void;
    fetchReplies: (params: Record<string, unknown>) => Promise<CommentResponse>;
    depth?: number;
}

const MAX_DEPTH = 2;

const CommentItem = ({
    comment,
    onLike,
    fetchReplies,
    depth = 0
}: Props) => {
    const [showReply, setShowReply] = useState(false);
    const [replies, setReplies] = useState<CommentType[]>([]);
    const [page, setPage] = useState(0);
    const [size] = useState(3);
    const [hasMore, setHasMore] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(comment.likedByCurrentUser);

    const { refetch: createComment } = useGet(postComment);

    const isDeep = depth >= MAX_DEPTH;

    // Load replies
    const loadReplies = async () => {
        if (loading) return;

        setLoading(true);
        setShowReply(true);

        try {
            const res = await fetchReplies({
                parentId: comment.id,
                page,
                size,
                sort: "createdAt,desc"
            });

            const newReplies = res.data || [];

            setReplies(prev => {
                const map = new Map(prev.map(r => [r.id, r]));
                newReplies.forEach(r => map.set(r.id, r));
                return Array.from(map.values());
            });

            setPage(prev => prev + 1);

            if (newReplies.length < size) setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    // Submit reply
    const handleSubmitReply = async (text: string) => {
        if (!text.trim()) return;

        const data: CommentRequest = {
            content: text,
            articleId: comment.articleId,
            parentId: comment.id
        };

        const res = await createComment(data);

        const newReply =
            (res as AxiosResponse<CommentType>)?.data || (res as CommentType);

        setShowReply(true);

        setReplies(prev => {
            const map = new Map(prev.map(r => [r.id, r]));
            map.set(newReply.id, newReply);
            return Array.from(map.values());
        });

        setShowForm(false);
    };

    return (
        <div className="relative pt-2">
            <div className="flex gap-2 sm:gap-3 relative">
                {depth > 0 && (
                    <div className="absolute left-[-12px] top-4 w-3 h-3 border-l border-b border-gray-300 rounded-bl-lg" />
                )}

                <img
                    src={comment.authorAvatar || "/default-avatar.png"}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0 relative z-10"
                />

                <div className="flex-1 min-w-0">
                    <div className="bg-gray-100 hover:bg-gray-200 transition rounded-2xl px-3 sm:px-4 py-2 shadow-sm">
                        <div className="font-semibold text-xs sm:text-sm text-gray-900">
                            {comment.authorName || comment.authorEmail}
                        </div>

                        <div className="text-gray-800 text-xs sm:text-sm break-words">
                            {isDeep && comment.parentAuthorName
                                ? `@${comment.parentAuthorName}: ${comment.content}`
                                : comment.content}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] sm:text-xs text-gray-500">
                        <button
                            onClick={() => {
                                setLiked(!liked);
                                onLike(comment)
                            }}
                            className={`hover:text-blue-600 ${liked
                                ? "text-blue-600 font-medium"
                                : ""
                                }`}
                        >
                            <BiLike className="inline mr-1" />
                            Thích
                        </button>

                        <button
                            onClick={() => setShowForm(prev => !prev)}
                            className="hover:text-blue-600"
                        >
                            <BiMessageRounded className="inline mr-1" />
                            Trả lời
                        </button>

                        <span>
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    {showForm && (
                        <div className="mt-2">
                            <CommentForm onSubmit={handleSubmitReply} />
                        </div>
                    )}

                    {!showReply && comment.totalReplies > 0 && (
                        <button
                            onClick={() => {
                                setReplies([]);
                                setPage(0);
                                setHasMore(true);
                                loadReplies();
                            }}
                            className="mt-2 text-xs sm:text-sm text-gray-500 hover:text-blue-600"
                        >
                            Xem {Math.min(size, comment.totalReplies)} phản hồi
                        </button>
                    )}
                </div>
            </div>

            {showReply && (
                <div className={`mt-3 relative ${depth < 2 ? "pl-6" : ""}`}>
                    {/* LINE DỌC CHUNG */}
                    {depth < 2 && (
                        <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-300" />
                    )}

                    <div className="flex flex-col">
                        {replies.map(reply => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                onLike={onLike}
                                fetchReplies={fetchReplies}
                                depth={Math.min(depth + 1, MAX_DEPTH)}
                            />
                        ))}

                        {hasMore && (
                            <button
                                onClick={loadReplies}
                                disabled={loading}
                                className="text-xs sm:text-sm text-gray-500 hover:text-blue-600 text-left disabled:opacity-50"
                            >
                                {loading ? "Đang tải..." : "Xem thêm phản hồi"}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentItem;