import ImageUpload from "../../../components/ImageUploader/ImageUploader";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from "../../../store/store";
import { useState } from "react";
import usePost from "../../../hooks/usePost";
import { updateInformation } from "../../../services/tranformation/update";
import { fetchUser } from "../../../services/auth/get-me/getMe";
import { toast } from "react-toastify";

interface FormError {
    fullname?: string;
}

const Information = () => {

    const user = useSelector((state: RootState) => state.auth.user);

    const [fullname, setFullname] = useState(user?.fullname || "");
    const [image, setImage] = useState<File | undefined>();
    const { refetch, loading } = usePost(updateInformation);
    const dispatch = useDispatch<AppDispatch>();
    const [error, setError] = useState<FormError>({});

    const onFile = (file: File) => {
        setImage(file);
    }

    const validate = () => {
        const newError: FormError = {};

        if (!fullname.trim()) {
            newError.fullname = "Họ và tên không được để trống";
        }

        setError(newError);

        return Object.keys(newError).length === 0;
    };

    const handleUpdate = async () => {
        try {

            if (!validate()) return;

            const res = await refetch({ file: image!, fullname });

            if (res) {
                dispatch(fetchUser());
                toast.success("Cập nhật thành công!");
                setImage(undefined);
            }

        } catch (err: unknown) {
            console.error(err);
            toast.error("Có lỗi xảy ra!");
        }
    }

    return (
        <section className="min-h-96 px-4 max-w-screen-xl mx-auto flex items-center">
            <div className="w-full bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col md:flex-row flex-wrap gap-6 md:gap-8">

                {/* IMAGE */}
                <div className="w-full md:w-60 flex-shrink-0 flex flex-col items-center mx-auto md:mx-0">
                    <ImageUpload onChange={onFile} image={user?.avatar} />
                </div>

                {/* FORM */}
                <div className="flex-1 flex flex-col justify-center w-full">

                    <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center md:text-left">
                        Thông tin tài khoản
                    </h2>

                    {/* EMAIL */}
                    <div className="mb-4">
                        <label htmlFor="email" className="text-sm">Email</label>
                        <input
                            type="text"
                            id="email"
                            disabled
                            value={user?.email}
                            className="w-full rounded-lg px-4 py-2 border border-gray-300 outline-none text-sm sm:text-base"
                        />
                    </div>

                    {/* FULLNAME */}
                    <div className="mb-6">
                        <label htmlFor="fullname" className="text-sm">Họ và tên</label>
                        <input
                            type="text"
                            id="fullname"
                            value={fullname}
                            onChange={(e) => {
                                setFullname(e.target.value);

                                // clear lỗi khi nhập lại
                                setError(prev => ({ ...prev, fullname: undefined }));
                            }}
                            placeholder="Họ và tên"
                            className={`w-full rounded-lg px-4 py-2 border outline-none text-sm sm:text-base
                                ${error.fullname
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-blue-500"
                                }
                            `}
                        />

                        {error.fullname && (
                            <span className="text-red-500 text-sm mt-1 block">
                                {error.fullname}
                            </span>
                        )}
                    </div>

                    {/* BUTTON */}
                    <div className="flex justify-center md:justify-end">
                        {!loading ? (
                            <button
                                onClick={handleUpdate}
                                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition text-sm sm:text-base"
                            >
                                Cập nhật
                            </button>
                        ) : (
                            <button
                                disabled
                                className="w-full sm:w-auto bg-blue-400 text-white px-6 py-2 rounded-lg shadow text-sm sm:text-base"
                            >
                                Đang cập nhật...
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Information;