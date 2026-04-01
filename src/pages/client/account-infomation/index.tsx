import ImageUpload from "../../../components/ImageUploader/ImageUploader";
import { useSelector } from 'react-redux';
import type { RootState } from "../../../store/store";
import { useState } from "react";
import usePost from "../../../hooks/usePost";
import { UploadImage } from "../../../services/tranformation/uploadImage";

const Information = () => {

    const user = useSelector((state: RootState) => state.auth.user);
    
    const [fullname, setFullname] = useState();
    const [image, setImage] = useState<File>();
    const { refetch } = usePost(UploadImage);

    const onFile = (file: File) => {
       
        setImage(file);
        
    }

    const handleUpdate = async () => {

        if (!image) {
            return;
        }
        try {
            const res = await refetch(image);

        } catch (error: unknown) {
            console.error(error);
        }

    }
    

    return (
        <section className="min-h-96 px-4 max-w-screen-xl mx-auto flex items-center">
            <div className="w-full bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col md:flex-row flex-wrap gap-6 md:gap-8">

                <div className="w-full md:w-60 flex-shrink-0 flex justify-center mx-auto md:mx-0">
                    <ImageUpload onChange={onFile} image={user?.avatar} />
                </div>

                <div className="flex-1 flex flex-col justify-center w-full">

                    <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center md:text-left">
                        Thông tin tài khoản
                    </h2>

                    <div className="mb-4">
                        <label htmlFor="email" className="text-sm">Email</label>
                        <input
                            type="text"
                            placeholder="email"
                            id="email"
                            disabled
                            value={user?.email}
                            className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-blue-500 outline-none text-sm sm:text-base"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="fullname" className="text-sm">Họ và tên</label>
                        <input
                            type="text"
                            id="fullname"
                            value={user?.fullname}
                            placeholder="Họ và tên"
                            className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:border-blue-500 outline-none text-sm sm:text-base"
                        />
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <button onClick={() => handleUpdate()} className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition text-sm sm:text-base">
                            Cập nhật
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}
export default Information;