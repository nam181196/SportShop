# 05. Tính năng dự án

Dự án SportShop được xây dựng với các nhóm tính năng chính:

## 1. Mua sắm
- **Xem sản phẩm:** Trang chủ cung cấp cái nhìn tổng quan về tất cả các mặt hàng hiện có theo dạng lưới (Grid), với hiệu ứng hover đẹp mắt.
- **Giỏ hàng tạm (Session Cart):** Người mua có thể thêm nhanh một mặt hàng vào giỏ. Hệ thống sử dụng Session để nhớ dữ liệu mua hàng trong suốt phiên mà không bắt buộc phải Đăng nhập.
- **Tính tổng tiền:** Tự động thống kê các mặt hàng, gộp nhóm theo số lượng và tính tổng giá trị thanh toán cuối cùng.

## 2. Quản lý hệ thống (Admin)
- **Giao diện Dashboard riêng biệt:** Tách biệt với mặt tiền trang bán hàng để đảm bảo trải nghiệm quản lý gọn gàng, hiệu quả.
- **CRUD Operations:** Có thể Thêm (Create), Xem (Read), Sửa (Update), Xoá (Delete) sản phẩm ngay trên nền tảng web.
- **Hỗ trợ tải hình ảnh thực tế:** Admin không bắt buộc phải dán URL ngoài mà có thể chọn file ảnh từ máy tính để tải lên server thông qua thư viện Multer.

## 3. Giao diện người dùng
- **Thiết kế Premium (Cao cấp):** Phong cách đơn sắc hiện đại kết hợp với Glassmorphism trên thanh Header.
- **Responsive:** Layout tự thích ứng với các kích cỡ màn hình khác nhau.
- **Hiệu ứng Animation:** Chữ Hero banner tự động trượt, ảnh phóng to khi đưa chuột vào.
