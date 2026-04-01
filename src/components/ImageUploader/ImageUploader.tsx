import React, { useState, useEffect } from "react";
import "./stype.css";
import { validateImageFile } from "../../utils/validateImageFile";
import { toast } from "react-toastify";

type Props = {
    image?: string;
    onChange?: (file: File) => void;
};

const ImageUpload = ({ onChange, image }: Props) => {
    const [preview, setPreview] = useState<string | null>(null);

    const displayImage: string | undefined = preview ?? image;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (validateImageFile(file)) {
            toast.warning(validateImageFile(file));
            return;

        }

        const url = URL.createObjectURL(file);

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setPreview(url);
        onChange?.(file);
    };

    // cleanup khi unmount
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <label className="upload-avatar">
            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                hidden
            />

            {displayImage ? (
                <img
                    src={displayImage}
                    alt="avatar"
                    className="avatar-img"
                />
            ) : (
                <span className="avatar-text">Chọn ảnh</span>
            )}
        </label>
    );
};

export default ImageUpload;