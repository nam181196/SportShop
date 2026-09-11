# 04. API & Routing Reference

Ứng dụng không sử dụng kiến trúc RESTful API thuần túy (trả về JSON) mà chủ yếu render giao diện HTML tĩnh qua EJS. Dưới đây là danh sách các Routes chính:

## Public Routes (Người dùng)

| Method | Endpoint         | Chức năng                                                  |
|--------|------------------|------------------------------------------------------------|
| `GET`  | `/`              | Trang chủ (Hiển thị danh sách toàn bộ sản phẩm)            |
| `GET`  | `/seed`          | Tự động tạo dữ liệu mẫu (Chỉ nên dùng 1 lần)               |

## Cart Routes (Giỏ hàng)

| Method | Endpoint               | Chức năng                                            |
|--------|------------------------|------------------------------------------------------|
| `POST` | `/cart/add/:id`        | Thêm một sản phẩm vào giỏ hàng (lưu qua Session)     |
| `GET`  | `/cart`                | Hiển thị trang giỏ hàng của người dùng               |
| `POST` | `/cart/remove/:id`     | Xoá một sản phẩm khỏi giỏ hàng                       |

## Admin Routes (Quản trị)

| Method   | Endpoint                     | Chức năng                                        |
|----------|------------------------------|--------------------------------------------------|
| `GET`    | `/admin/products`            | Trang danh sách sản phẩm quản trị                |
| `GET`    | `/admin/products/new`        | Trang form thêm mới sản phẩm                     |
| `POST`   | `/admin/products`            | Xử lý dữ liệu form thêm mới (kèm ảnh upload)     |
| `GET`    | `/admin/products/:id/edit`   | Trang form chỉnh sửa thông tin sản phẩm          |
| `PUT`    | `/admin/products/:id`        | Cập nhật thông tin sản phẩm (có dùng override)   |
| `DELETE` | `/admin/products/:id`        | Xóa sản phẩm khỏi CSDL                           |
