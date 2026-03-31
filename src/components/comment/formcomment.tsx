import { useState } from "react";

interface Props {
    content: string,
    handleComment: (value: string) => void
}

const FormComment = ({ content, handleComment }: Props) => {

    const [comment, setComment] = useState(content);

    const [error, setError] = useState(false);


    return (
        <>
            <div className="w-full">
                <textarea
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                        setError(false);
                    }}
                    placeholder="Viết bình luận..."
                    className={`flex-1 w-full border rounded-lg px-4 py-2 outline-none focus:border-blue-500 ${error ? "border-red-600" : ""}`}
                />
                <span className={`text-sm text-red-600 ${error ? "block" : "hidden"}`}>Bình luận không được để trống!</span>
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            if (!comment) {
                                setError(true);
                                return;
                            }
                            handleComment(comment);
                            setComment("");

                        }}
                        className="bg-blue-500 text-white inline px-5 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Gửi
                    </button>
                </div>
            </div>


        </>
    )
}

export default FormComment;