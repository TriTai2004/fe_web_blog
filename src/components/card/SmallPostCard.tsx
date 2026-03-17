import { Link } from "react-router-dom";
import type { Post } from "../../services/post/type";
import { FiCalendar } from "react-icons/fi";

type Props = {
    post: Post;
};

const SmallPostCard = ({ post }: Props) => {

    const date = new Date(post.createdAt).toLocaleDateString("vi-VN");

    return (
        <Link
            to={`/posts/${post.slug}`}
            className="flex gap-3 group hover:bg-gray-50 p-2 rounded-lg transition"
        >
            {/* image */}
            <img
                src={post.thumbnail}
                alt={post.title}
                className="w-20 h-16 object-cover rounded-md"
            />

            {/* content */}
            <div className="flex flex-col justify-between flex-1">

                {/* title */}
                <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition">
                    {post.title}
                </h4>

                {/* date */}
                <span className="flex items-center gap-1 text-xs text-gray-500">
                    <FiCalendar size={12} />
                    {date}
                </span>

            </div>
        </Link>
    );
};

export default SmallPostCard;