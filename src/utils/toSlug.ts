export function toSlug(str: string) {
    return str
        .toLowerCase()
        .normalize('NFD') // Chuyển về dạng tổ hợp
        .replace(/[\u0300-\u036f]/g, '') // Xóa dấu tiếng Việt
        .replace(/[đĐ]/g, 'd')
        .replace(/([^0-9a-z-\s])/g, '') // Xóa ký tự đặc biệt
        .replace(/(\s+)/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
        .replace(/-+/g, '-') // Xóa nhiều gạch ngang liên tiếp
        .replace(/^-+|-+$/g, '') // Xóa gạch ngang ở đầu/cuối
}
