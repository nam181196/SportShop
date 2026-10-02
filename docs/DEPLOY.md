# 🚀 Hướng dẫn Deploy SportShop lên Server

## Bước 1: Copy project lên server

Chạy lệnh này trên **máy local** của bạn (thay `USER@SERVER_IP` bằng thông tin server):

```bash
# Copy toàn bộ SportShop lên server (bỏ node_modules và .env)
rsync -avz --exclude='node_modules' --exclude='.env' --exclude='mydata' \
  /Users/nam/Desktop/SportShop/ \
  namng@<SERVER_IP>:~/SportShop/

# Tương tự copy MCP-EMA (nếu cần)
rsync -avz --exclude='node_modules' --exclude='.env' --exclude='__pycache__' \
  /Users/nam/Desktop/MCP-EMA/ \
  namng@<SERVER_IP>:~/MCP-EMA/
```

> Hoặc dùng `scp` nếu không có `rsync`:
> ```bash
> scp -r /Users/nam/Desktop/SportShop namng@<SERVER_IP>:~/
> scp -r /Users/nam/Desktop/MCP-EMA namng@<SERVER_IP>:~/
> ```

---

## Bước 2: Tạo file `.env` trên server

SSH vào server rồi chạy:

```bash
cd ~/SportShop
cat > .env << 'EOF'
PORT=3000
MONGODB_URI=mongodb+srv://ngnamob7_db_user:CbmsEz6Inneuy8Ol@sportshop.rmoobmc.mongodb.net/sportShopDB?retryWrites=true&w=majority&appName=SportShop
SESSION_SECRET=sportshop_secret_key_2026
EOF
```

---

## Bước 3: Kiểm tra Docker đã cài chưa

```bash
docker --version
docker compose version
```

Nếu chưa có, cài Docker:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

---

## Bước 4: Build và chạy containers

```bash
cd ~/SportShop

# Build và chạy backend + mcp server
docker compose up -d --build

# Xem logs để kiểm tra
docker compose logs -f
```

---

## Bước 5: Kiểm tra kết quả

```bash
# Xem các container đang chạy
docker compose ps

# Test backend
curl http://localhost:3000

# Test API
curl http://localhost:3000/api/products
```

---

## Lệnh hữu ích

```bash
# Xem log backend
docker compose logs backend -f

# Xem log mcp
docker compose logs mcp -f

# Restart
docker compose restart

# Dừng tất cả
docker compose down

# Cập nhật code và rebuild
docker compose up -d --build
```

---

## Cấu trúc thư mục trên server

```
~/
├── SportShop/          ← Project này
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── .env            ← Tạo thủ công trên server
│   ├── server.js
│   └── ...
└── MCP-EMA/            ← MCP Server project
    ├── Dockerfile
    └── ...
```
