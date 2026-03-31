import { Link } from "react-router-dom";
import type { Post } from "../../services/post/type";
import { FiEye, FiCalendar, FiArrowRight } from "react-icons/fi";
import React from "react";

type Props = {
    post: Post;
};

const PostCard = React.memo(({ post }: Props) => {

    const date = new Date(post.createdAt).toLocaleDateString("vi-VN");

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col md:flex-row group">

            {/* image */}
            <div className="md:w-60 overflow-hidden">
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition duration-500"
                />
            </div>

            {/* content */}
            <div className="p-6 flex flex-col justify-between flex-1">

                <div>

                    {/* meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                            <FiCalendar className="text-gray-400" />
                            {date}
                        </span>

                        <span className="flex items-center gap-1">
                            <FiEye className="text-gray-400" />
                            {post.views}
                        </span>
                    </div>

                    {/* title */}
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-indigo-600 transition">
                        {post.title}
                    </h3>

                    {/* preview */}
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {post.content}
                    </p>

                </div>

                {/* button */}
                <Link
                    to={`/posts/${post.slug}`}
                    className="mt-4 flex items-center gap-2 text-indigo-600 font-medium hover:underline"
                >
                    Đọc thêm
                    <FiArrowRight />
                </Link>

            </div>

        </div>
    );
});

export default PostCard;