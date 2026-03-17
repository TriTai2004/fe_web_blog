import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useGet from "../../../hooks/useFetch";
import { getPosts, getPostsPopular } from "../../../services/post/postService";
import type { Post } from "../../../services/post/type";
import PostCard from "../../../components/card/PostCard";
import SmallPostCard from "../../../components/card/SmallPostCard";
import { formatDate } from './../../../utils/data';
import { FiCalendar } from "react-icons/fi";
const Home = () => {

    const [page, setPage] = useState<number | 0>(0);
    const [size] = useState<number | 0>(5);
    const [postPopular, setPostPopular] = useState<{ data: Post[] } | null>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [postNews, setPostNews] = useState<{ data: Post[] } | null>(null);

    const params = useMemo(() => {
        return {
            page,
            size,
            sort: "createdAt,desc"
        }
    }, [page, size]);

    const { refetch: fetchPosts } = useGet(getPosts);
    const { refetch: fetchPostsPopular } = useGet(getPostsPopular);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchPosts(params);
                setPostNews((prev) => ({
                    data: [...(prev?.data || []), ...res.data]
                }));
                setTotalPages(res.totalPages);

                const response = await fetchPostsPopular({ page: 0, size: 6 });
                setPostPopular(response);

                console.log(response.data);
                

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();

    }, [page, size]);


    return (
        <div className="bg-gray-50 min-h-screen">

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Featured Post */}
                {postPopular && (
                    <div className="mb-12">
                        <div className="relative rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={postPopular.data[0].thumbnail}
                                alt={postPopular.data[0].title}
                                className="w-full h-[400px] object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-end">
                                <div className="p-8 text-white">
                                    <p className="text-sm mb-2 flex items-center gap-1">
                                        <FiCalendar className="text-gray-400" />
                                        {formatDate(new Date(postPopular.data[0].createdAt))}
                                    </p>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                                        {postPopular.data[0].title}
                                    </h2>
                                    <p className="mb-4 max-w-2xl">

                                    </p>
                                    <Link
                                        to={`/posts/${postPopular.data[0].slug}`}
                                        className="bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Post List */}
                    {postNews && (
                        <div className="lg:col-span-2 space-y-8">
                            {postNews.data.map((post: Post) => (
                                <PostCard post={post} key={post.id} />
                            ))}
                            <span className={`block text-center cursor-pointer hover:text-blue-500 transition-all ${(postNews && page < totalPages - 1) ? "" : "hidden"}`} onClick={() => {
                                if (postNews && page < totalPages - 1) {
                                    setPage(page + 1);
                                }
                            }}>Xem thêm</span>
                        </div>)}

                    {/* Sidebar */}
                    <div className="space-y-8 ">
                        <div className="bg-white sticky top-6  p-6 rounded-xl shadow">
                            <h3 className="text-lg font-semibold mb-4">
                                Bài viết phổ biến
                            </h3>
                            {postPopular && (
                                <div className="lg:col-span-2 space-y-8">
                                    {postPopular.data.slice(1, postPopular.data.length).map((post: Post) => (
                                        <SmallPostCard post={post} key={post.id} />
                                    ))}
                                  
                                </div>)}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;