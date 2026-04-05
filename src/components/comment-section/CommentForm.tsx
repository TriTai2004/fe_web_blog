import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface Props {
    onSubmit: (content: string) => void;
    onCancel: () => void;
    variant?: "main" | "reply";
}

const CommentForm = ({ onSubmit, onCancel, variant = "main" }: Props) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const user = useSelector((state: RootState) => state.auth.user);
  
    const handleSubmit = () => {
        if (!value.trim()) {
            setError(true);
            return;
        }
        onSubmit(value);
        setValue("");
        setIsFocus(false);
    };

    // auto resize
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    }, [value]);

    useEffect(() => {
        if (variant === "reply") {
            textareaRef.current?.focus();
        }
    }, [variant]);

    return (
        <div className="w-full flex gap-3">
            {/* Avatar animate */}
            <img
                className={`rounded-full bg-gray-300 flex-shrink-0 transition-all duration-200
                    ${variant === "main"
                        ? isFocus
                            ? "w-9 h-9"
                            : "w-6 h-6"
                        : "w-6 h-6"
                    }
                `}
                src={ user?.avatar || "/default-avatar.jpg" }
                alt="avatar"
            />

            <div className="flex-1">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setError(false);
                    }}
                    placeholder={
                        variant === "reply"
                            ? "Viết phản hồi..."
                            : "Thêm bình luận..."
                    }
                    className={`w-full resize-none text-sm bg-transparent border-b outline-none transition-all duration-200 overflow-hidden
                        ${variant === "main"
                            ? isFocus
                                ? "border-gray-400 focus:border-black"
                                : "border-transparent cursor-text"
                            : "border-gray-300 focus:border-black"
                        }
                        ${error ? "border-red-500" : ""}
                    `}
                />

                {error && (
                    <span className="text-xs text-red-500 mt-1 block">
                        Bình luận không được để trống!
                    </span>
                )}

                {/* Actions */}
                {isFocus && (
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            onClick={() => {
                                setValue("");
                                setError(false);
                                setIsFocus(false);
                                onCancel();
                            }}
                            className="px-3 py-1.5 text-sm rounded-full hover:bg-gray-100 transition"
                        >
                            Hủy
                        </button>

                        <button
                            onClick={handleSubmit}
                            className={`px-4 py-1.5 text-sm rounded-full text-white transition
                                ${value.trim()
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-300 cursor-not-allowed"
                                }
                            `}
                        >
                            {variant === "reply" ? "Trả lời" : "Bình luận"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentForm;