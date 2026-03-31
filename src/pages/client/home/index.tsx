import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useGet from "../../../hooks/useFetch";
import { getPosts, getPostsPopular } from "../../../services/post/postService";
import type { Post } from "../../../services/post/type";
import PostCard from "../../../components/card/PostCard";
import SmallPostCard from "../../../components/card/SmallPostCard";
import { formatDate } from "./../../../utils/data";
import { FiCalendar } from "react-icons/fi";

const Home = () => {
    const [page, setPage] = useState(0);
    const [size] = useState(5);

    const [postPopular, setPostPopular] = useState<Post[]>([]);
    const [postNews, setPostNews] = useState<Post[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    const fetchedRef = useRef(false);

    console.log("render");

    const params = useMemo(() => {
        return {
            page,
            size,
            sort: "createdAt,desc",
        };
    }, [page, size]);

    const { refetch: fetchPosts } = useGet(getPosts);
    const { refetch: fetchPostsPopular } = useGet(getPostsPopular);

    useEffect(() => {
        const fetchPopular = async () => {
            const res = await fetchPostsPopular({ page: 0, size: 6 });
            setPostPopular(res.data || []);
        };

        fetchPopular();
    }, []);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        const fetchInit = async () => {
            try {
                const res = await fetchPosts(params);
                setPostNews(res.data || []);
                setTotalPages(res.totalPages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchInit();
    }, []);

    useEffect(() => {
        if (page === 0) return;

        const fetchMore = async () => {
            try {
                const res = await fetchPosts(params);

                setPostNews((prev) => {
                    const map = new Map();

                    [...prev, ...res.data].forEach((item) => {
                        map.set(item.id, item); // loại duplicate
                    });

                    return Array.from(map.values());
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchMore();
    }, [page]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Featured */}
                {postPopular.length > 0 && (
                    <div className="mb-12">
                        <div className="relative rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={postPopular[0].thumbnail}
                                alt={postPopular[0].title}
                                className="w-full h-[400px] object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-end">
                                <div className="p-8 text-white">
                                    <p className="text-sm mb-2 flex items-center gap-1">
                                        <FiCalendar />
                                        {formatDate(new Date(postPopular[0].createdAt))}
                                    </p>
                                    <h2 className="text-3xl font-bold mb-3">
                                        {postPopular[0].title}
                                    </h2>
                                    <Link
                                        to={`/posts/${postPopular[0].slug}`}
                                        className="bg-indigo-600 px-6 py-2 rounded-lg"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* List */}
                    <div className="lg:col-span-2 space-y-8">
                        {postNews.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}

                        {page < totalPages - 1 && (
                            <span
                                className="block text-center cursor-pointer hover:text-blue-500"
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Xem thêm
                            </span>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white sticky top-6 p-6 rounded-xl shadow">
                            <h3 className="text-lg font-semibold mb-4">
                                Bài viết phổ biến
                            </h3>

                            {postPopular.slice(1).map((post) => (
                                <SmallPostCard
                                    key={post.id}
                                    post={post}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;