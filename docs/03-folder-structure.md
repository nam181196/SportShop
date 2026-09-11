# 03. Cấu trúc Thư mục

Dưới đây là sơ đồ cấu trúc của dự án SportShop:

```text
SportShop/
│
├── docs/                      # Chứa tài liệu dự án
│   ├── 01-introduction.md
│   ├── 02-installation.md
│   ├── 03-folder-structure.md
│   ├── 04-api-reference.md
│   └── 05-features.md
│
├── models/                    # Khai báo schema cho Database
│   └── Product.js             # Mongoose schema cho Sản phẩm
│
├── public/                    # Thư mục public chứa tài nguyên tĩnh
│   ├── css/
│   │   └── style.css          # CSS cho toàn bộ web
│   └── uploads/               # Nơi lưu trữ ảnh được upload lên server
│
├── views/                     # Thư mục EJS chứa các template giao diện
│   ├── admin/                 # Giao diện cho phần Quản trị (Admin)
│   │   ├── partials/          # Header, footer tái sử dụng cho admin
│   │   └── products/          # Các trang danh sách, thêm, sửa cho admin
│   ├── cart.ejs               # Trang giỏ hàng
│   └── index.ejs              # Trang chủ hiển thị sản phẩm
│
├── package.json               # Quản lý dependencies
└── server.js                  # File chạy chính của ứng dụng
```
