import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit, FiTrash2, FiFlag } from "react-icons/fi";

type Props = {
    isOwner: boolean;
    onUpdate?: () => void;
    onDelete?: () => void;
    onReport?: () => void;
};

const ActionMenu = ({ isOwner, onUpdate, onDelete, onReport }: Props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-block">
            {/* icon 3 chấm */}
            <BsThreeDotsVertical
                className="cursor-pointer text-gray-500 hover:text-black"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
                size={18}
            />

            {/* menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                    {isOwner ? (
                        <>
                            <div
                                onClick={onUpdate}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                                <FiEdit size={16} />
                                Cập nhật
                            </div>

                            <div
                                onClick={onDelete}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-red-100 text-red-500 cursor-pointer text-sm"
                            >
                                <FiTrash2 size={16} />
                                Xoá
                            </div>
                        </>
                    ) : (
                        <div
                            onClick={onReport}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-yellow-100 text-yellow-600 cursor-pointer text-sm"
                        >
                            <FiFlag size={16} />
                            Báo cáo
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ActionMenu;