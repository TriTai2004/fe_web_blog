export const validateImageFile = (file: File): string | null => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
        return "Chỉ chấp nhận file ảnh (jpg, png, webp)";
    }

    const maxSize = 100 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
        return "Ảnh không được lớn hơn 2MB";
    }

    return null; 
};