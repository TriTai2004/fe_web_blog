import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

type Props = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {

    const generatePages = () => {

        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {

            pages.push(1);

            if (currentPage > 4) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 3) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const pages = generatePages();

    return (
        <div className="flex items-center gap-2 justify-center mt-8">

            {/* prev */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-2 border rounded disabled:opacity-40"
            >
                <FaAngleDoubleLeft size={15}/>
            </button>

            {pages.map((p, index) => {

                if (p === "...") {
                    return (
                        <span key={index} className="px-2">
                            ...
                        </span>
                    );
                }

                return (
                    <button
                        key={p}
                        onClick={() => onPageChange(Number(p))}
                        className={`px-3 py-1 border rounded
                        ${currentPage === p
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "hover:bg-gray-100"
                            }`}
                    >
                        {p}
                    </button>
                );
            })}

            {/* next */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-2 border rounded disabled:opacity-40"
            >
                <FaAngleDoubleRight size={15}/>
            </button>

        </div>
    );
};

export default Pagination;