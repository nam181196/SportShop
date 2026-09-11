# 02. Hướng dẫn Cài đặt & Chạy dự án

## Yêu cầu hệ thống
- Node.js (phiên bản v14 trở lên)
- MongoDB (đang chạy local tại `mongodb://127.0.0.1:27017/`)

## Các bước cài đặt

1. **Clone/Download dự án** về máy.
2. **Cài đặt các gói thư viện** (Dependencies)
   Mở terminal tại thư mục gốc của dự án và chạy:
   ```bash
   npm install
   ```
3. **Seed dữ liệu (Tuỳ chọn)**
   Nếu database của bạn chưa có sản phẩm nào, hãy mở server và truy cập route `/seed` để hệ thống tự động tạo các sản phẩm mẫu.

4. **Khởi chạy Server**
   ```bash
   node server.js
   ```

5. **Truy cập**
   - Trang chủ người dùng: `http://localhost:3000`
   - Trang quản trị Admin: `http://localhost:3000/admin/products`
