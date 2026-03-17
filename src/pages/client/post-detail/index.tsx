import { useEffect, useState } from "react";
import { BiCalendar, BiShow, BiLike } from "react-icons/bi";
import useGet from "../../../hooks/useFetch";
import { getPostsSlug, updateViews } from "../../../services/post/postService";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../utils/data";
import type { Post } from "../../../services/post/type";
import type { Like } from "../../../services/likePost/type";
import { getLike, likeOrDislike } from "../../../services/likePost/likeService";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { toast } from "react-toastify";

type Comment = {
  id: number;
  name: string;
  content: string;
  createdAt: string;
};

const PostDetail = () => {

  const [post, setPost] = useState<Post | null | undefined>(null);
  const [isLike, setIsLike] = useState<Like | null | undefined>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const { postSlug } = useParams();
  const { refetch: fetchPost, loading } = useGet<Post, string>(getPostsSlug);
  const { refetch: handleViews } = useGet<Post, string>(updateViews);
  const { refetch: fetchLike } = useGet(getLike);
  const { refetch: postLike } = useGet(likeOrDislike);

  useEffect(() => {

    const getPost = async () => {

      if (!postSlug?.trim()) {
        return;
      }
      const res = await fetchPost(postSlug);

      setPost(res);

    }

    getPost();

  }, [postSlug]);

  useEffect(() => {

    const getLike = async () => {

      if (!user?.id || !post?.id) return;

      const params = {
        authorId: user.id,
        articleId: post.id
      };

      const res = await fetchLike(params);

      if (res) {
        setIsLike(res);
      }
    };

    getLike();

  }, [post?.id, user?.id]);


  useEffect(() => {

    if (!post?.id) return;

    const viewed = localStorage.getItem(`viewed-${post.id}`);
    if (viewed) {
      return;
    }

    const timer = setTimeout(async () => {

      const res = await handleViews(post.id);
      localStorage.setItem(`viewed-${post.id}`, "true");
      if (res) {
        setPost(res);
      }

    }, 5000);

    return () => clearTimeout(timer);

  }, [post?.id]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      content: "Bài viết rất hay!",
      createdAt: "2026-03-11",
    },
  ]);

  const [commentInput, setCommentInput] = useState("");

  const handleLike = async () => {

    if (!user?.id) {
      toast.warning('Vui lòng đăng nhập để thích bài viết!');
    }

    if (!user?.id || !post?.id) return;

    const params = {
      authorId: user.id,
      articleId: post.id
    };

    const res = await postLike(params);
    setIsLike(res);
    setPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        likes: prev.likes + (isLike ? -1 : 1)
      };
    });

  };



  const handleComment = () => {
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name: "Bạn",
      content: commentInput,
      createdAt: new Date().toISOString(),
    };

    setComments([newComment, ...comments]);
    setCommentInput("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      {!loading && post && (
        <div className="mx-auto pt-10 max-w-screen-xl px-4">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full max-h-[420px] object-cover rounded-2xl shadow"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-screen-xl mx-auto py-12 px-4">


        {!loading && post && (
          <>
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-gray-500 text-sm mb-8">

              <div className="flex items-center gap-2">
                <BiCalendar />
                {formatDate(new Date(post.createdAt))}
              </div>

              <div className="flex items-center gap-2">
                <BiShow />
                {post.views} lượt xem
              </div>

              {/* Like */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 px-3 py-1 rounded-md border transition
              ${isLike ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}
            `}
              >
                <BiLike />
                {post.likes}
              </button>

            </div>

            <div className="border-t mb-10"></div>

            {/* Article */}
            <article dangerouslySetInnerHTML={{ __html: post.content }} className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line mb-12">
            </article>
          </>
        )}



        {/* Comment Section */}
        <div>

          <h2 className="text-2xl font-semibold mb-6">
            Bình luận ({comments.length})
          </h2>

          {/* Comment Input */}
          <div className="flex gap-3 mb-8">

            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Viết bình luận..."
              className="flex-1 border rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleComment}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
            >
              Gửi
            </button>

          </div>

          {/* Comment List */}
          <div className="space-y-4">

            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span className="font-medium text-gray-700">
                    {c.name}
                  </span>
                  <span>
                    {new Date(c.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                <p className="text-gray-700">{c.content}</p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div >
  );
};

export default PostDetail;