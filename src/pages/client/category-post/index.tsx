
import { useEffect, useRef, useState } from "react"
import type { Post } from "../../../services/post/type";
import useGet from "../../../hooks/useFetch";
import { getPosts } from "../../../services/post/postService";
import { useParams } from "react-router-dom";
import PostView from "../../../components/card/PostView";
import Pagination from "../../../components/pagination";
import { BiSearch } from "react-icons/bi";

const CategoryPage = () => {

    const [posts, setPosts] = useState<{ data: Post[], totalPages: number } | null>(null);
    const [page, setPage] = useState<number>(0);
    const [search, setSearch] = useState("");
    const size = 6;

    const { loading, refetch } = useGet(getPosts);

    const { slugCategory } = useParams();

    const timeout = useRef<number | undefined>(undefined);


    useEffect(() => {

        const fetchPosts = async () => {
            const params = {
                page,
                size,
                slugCategory,
                sort: "createdAt,desc",
                search
            }
            const res = await refetch(params);
            setPosts(res);
        }

        fetchPosts();

    }, [slugCategory, page]);


    useEffect(() => {

        clearTimeout(timeout.current);

        const params = {
            page,
            size,
            slugCategory,
            sort: "createdAt,desc",
            search
        }
        timeout.current = setTimeout(async () => {
            const res = await refetch(params);
            setPosts(res);
        }, 500);

    }, [search]);



    const categoryName = "Công nghệ";

    return (


        <>
            {!loading ? (
                <div className="max-w-7xl mx-auto px-4 py-10">

                    {/* Title */}
                    <div className="flex-row md:flex justify-between">
                        <h1 className="text-2xl font-bold mb-2">
                            Danh mục: {categoryName}
                        </h1>

                        <div className="mb-5 ">
                            <div className="relative">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text" placeholder="Tìm kiếm..." className="w-full rounded-lg  text-gray-900 px-4 pe-9 py-2 outline-none border border-gray-700 focus:border-blue-500" />
                                <BiSearch size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Grid bài viết */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">



                        {!loading && posts?.data.map((post: Post) => (
                            <PostView post={post} key={post.id} />
                        ))}
                        {/* Empty */}
                        {!loading && posts?.data.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                Không tìm thấy bài viết.
                            </div>
                        )}
                    </div>
                    {posts && posts.totalPages > 1 && (
                        <Pagination
                            totalPages={posts.totalPages}
                            currentPage={page + 1}
                            onPageChange={(p) => setPage(p - 1)}
                        />
                    )}
                </div>
            ) : (
                <div className="min-h-96 flex items-center justify-center bg-gray-300">
                    <span className="animate-spin h-10 w-10 border-2 border-gray-500 border-t-transparent rounded-full"></span>
                </div>
            )}
        </>


    )
}

export default CategoryPage;