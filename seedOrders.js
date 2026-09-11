require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Order = require('./models/Order');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sportShopDB';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ DB Connected (' + (MONGODB_URI.includes('mongodb+srv') ? 'Cloud Atlas' : 'Local') + ')'))
    .catch(err => { console.error('❌ DB Error:', err); process.exit(1); });

// ─── Dữ liệu khách hàng mẫu (30 khách) ─────────────────────────────────────
const customers = [
    { fullName: 'Nguyễn Văn An', email: 'nguyenvanan@gmail.com', phone: '0901234567', address: '12 Lê Lợi, Q.1', city: 'Hồ Chí Minh' },
    { fullName: 'Trần Thị Bình', email: 'tranthiminh@gmail.com', phone: '0912345678', address: '45 Trần Hưng Đạo, Q.Hoàn Kiếm', city: 'Hà Nội' },
    { fullName: 'Lê Hoàng Cường', email: 'lehoangcuong@yahoo.com', phone: '0923456789', address: '78 Nguyễn Huệ, Q.Hải Châu', city: 'Đà Nẵng' },
    { fullName: 'Phạm Thị Dung', email: 'phamthidung@gmail.com', phone: '0934567890', address: '23 Phan Bội Châu, Q.Bình Thạnh', city: 'Hồ Chí Minh' },
    { fullName: 'Đỗ Minh Đức', email: 'dominhduc@gmail.com', phone: '0945678901', address: '56 Hoàng Văn Thụ, Q.Tân Bình', city: 'Hồ Chí Minh' },
    { fullName: 'Vũ Thị Hoa', email: 'vuthihoa@hotmail.com', phone: '0956789012', address: '89 Láng Hạ, Q.Đống Đa', city: 'Hà Nội' },
    { fullName: 'Hoàng Văn Hùng', email: 'hoangvanhung@gmail.com', phone: '0967890123', address: '34 Lý Thường Kiệt, Q.Cầu Giấy', city: 'Hà Nội' },
    { fullName: 'Ngô Thị Lan', email: 'ngothilan@gmail.com', phone: '0978901234', address: '67 Bạch Đằng, Q.Hải Châu', city: 'Đà Nẵng' },
    { fullName: 'Bùi Quốc Lâm', email: 'buiquoclam@gmail.com', phone: '0989012345', address: '10 Võ Văn Kiệt, Q.1', city: 'Hồ Chí Minh' },
    { fullName: 'Đinh Thị Mai', email: 'dinhthimai@gmail.com', phone: '0990123456', address: '43 Cách Mạng Tháng 8, Q.3', city: 'Hồ Chí Minh' },
    { fullName: 'Trương Văn Nam', email: 'truongvannam@gmail.com', phone: '0901357924', address: '76 Điện Biên Phủ, Q.Bình Thạnh', city: 'Hồ Chí Minh' },
    { fullName: 'Lý Thị Oanh', email: 'lythioanh@yahoo.com', phone: '0912468135', address: '29 Trần Phú, Q.Hà Đông', city: 'Hà Nội' },
    { fullName: 'Phan Minh Phúc', email: 'phanminhphuc@gmail.com', phone: '0923579246', address: '52 Lê Duẩn, Q.Hải Châu', city: 'Đà Nẵng' },
    { fullName: 'Đặng Thị Quỳnh', email: 'dangthiquynh@gmail.com', phone: '0934680357', address: '85 Nguyễn Trãi, Q.Thanh Xuân', city: 'Hà Nội' },
    { fullName: 'Tô Văn Rộng', email: 'tovanrong@gmail.com', phone: '0945791468', address: '18 Hùng Vương, Q.10', city: 'Hồ Chí Minh' },
    { fullName: 'Cao Thị Sen', email: 'caothisen@gmail.com', phone: '0956802579', address: '41 Phan Chu Trinh, Q.Hoàn Kiếm', city: 'Hà Nội' },
    { fullName: 'Lưu Văn Thắng', email: 'luuvanthang@hotmail.com', phone: '0967913680', address: '74 Ngô Quyền, Q.Sơn Trà', city: 'Đà Nẵng' },
    { fullName: 'Dương Thị Thu', email: 'duongthithu@gmail.com', phone: '0978024791', address: '7 Nam Kỳ Khởi Nghĩa, Q.1', city: 'Hồ Chí Minh' },
    { fullName: 'Hà Văn Toàn', email: 'havantoan@gmail.com', phone: '0989135802', address: '30 Phan Đình Phùng, Q.Ba Đình', city: 'Hà Nội' },
    { fullName: 'Kiều Thị Uyên', email: 'kieuthuyen@gmail.com', phone: '0990246913', address: '63 Nguyễn Văn Cừ, Q.5', city: 'Hồ Chí Minh' },
    { fullName: 'Mai Đức Việt', email: 'maiducviet@gmail.com', phone: '0901358024', address: '96 Quang Trung, Q.Gò Vấp', city: 'Hồ Chí Minh' },
    { fullName: 'Nguyễn Thị Xuân', email: 'nguyenthixuan@gmail.com', phone: '0912469135', address: '19 Nguyễn Lương Bằng, Q.Đống Đa', city: 'Hà Nội' },
    { fullName: 'Trần Văn Yên', email: 'tranvanyen@yahoo.com', phone: '0923570246', address: '42 Hải Phòng, Q.Hải Châu', city: 'Đà Nẵng' },
    { fullName: 'Lê Thị Zung', email: 'lethizung@gmail.com', phone: '0934681357', address: '75 Lê Hồng Phong, Q.10', city: 'Hồ Chí Minh' },
    { fullName: 'Phạm Quang Anh', email: 'phamquanganh@gmail.com', phone: '0945792468', address: '8 Trần Duy Hưng, Q.Cầu Giấy', city: 'Hà Nội' },
    { fullName: 'Đỗ Thanh Bảo', email: 'dothanhbao@gmail.com', phone: '0956803579', address: '31 Hoàng Diệu, Q.Hải Châu', city: 'Đà Nẵng' },
    { fullName: 'Vũ Ngọc Chi', email: 'vungocchi@gmail.com', phone: '0967914680', address: '64 Cộng Hòa, Q.Tân Bình', city: 'Hồ Chí Minh' },
    { fullName: 'Hoàng Thị Diệu', email: 'hoangthidieu@hotmail.com', phone: '0978025791', address: '97 Kim Mã, Q.Ba Đình', city: 'Hà Nội' },
    { fullName: 'Ngô Hữu Em', email: 'ngohuum@gmail.com', phone: '0989136802', address: '20 Đinh Tiên Hoàng, Q.Bình Thạnh', city: 'Hồ Chí Minh' },
    { fullName: 'Bùi Thị Phương', email: 'buithiphuong@gmail.com', phone: '0990247913', address: '53 Lý Nam Đế, Q.Hoàn Kiếm', city: 'Hà Nội' },
];

const paymentMethods = ['COD', 'banking', 'momo', 'zalopay', 'vnpay'];
const statuses = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled', 'returned'];

// Trọng số để tạo phân phối thực tế hơn
const statusWeights = {
    delivered: 45,   // 45% đã giao
    shipping: 20,   // 20% đang giao
    confirmed: 15,   // 15% đã xác nhận
    pending: 10,   // 10% chờ xử lý
    cancelled: 8,   // 8% đã hủy
    returned: 2    // 2% trả hàng
};

const paymentWeights = {
    COD: 35,
    banking: 25,
    momo: 20,
    zalopay: 12,
    vnpay: 8
};

const notes = [
    'Giao giờ hành chính',
    'Gọi trước khi giao 30 phút',
    'Để hàng trước cửa nếu không có người',
    'Giao buổi sáng trước 10h',
    'Giao buổi chiều sau 14h',
    'Hàng dễ vỡ, vui lòng đóng gói cẩn thận',
    '',
    '',
    '',
    'Không cần túi xách'
];

function weightedRandom(weights) {
    const entries = Object.entries(weights);
    const total = entries.reduce((sum, [, w]) => sum + w, 0);
    let rand = Math.random() * total;
    for (const [key, w] of entries) {
        rand -= w;
        if (rand <= 0) return key;
    }
    return entries[0][0];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateOrderCode(index) {
    return `SS${String(index + 1).padStart(5, '0')}`;
}

async function seedOrders() {
    try {
        // Lấy tất cả sản phẩm từ DB
        const products = await Product.find({});
        if (products.length === 0) {
            console.error('❌ Không tìm thấy sản phẩm! Hãy chạy seed.js trước.');
            process.exit(1);
        }
        console.log(`📦 Tìm thấy ${products.length} sản phẩm trong DB\n`);

        // Xóa đơn hàng cũ
        await Order.deleteMany({});
        console.log('🗑️  Đã xóa đơn hàng cũ');

        const orders = [];
        const startDate = new Date('2025-01-01');
        const endDate = new Date('2026-08-19');

        for (let i = 0; i < 100; i++) {
            const customer = customers[i % customers.length];
            const status = weightedRandom(statusWeights);
            const payMethod = weightedRandom(paymentWeights);

            // Số lượng sản phẩm trong đơn: 1–4
            const itemCount = randomInt(1, 4);
            const shuffledProds = [...products].sort(() => 0.5 - Math.random());
            const chosenProds = shuffledProds.slice(0, itemCount);

            const items = chosenProds.map(prod => {
                const qty = randomInt(1, 3);
                const subtotal = prod.price * qty;
                return {
                    productId: prod._id,
                    productName: prod.name,
                    brand: prod.brand,
                    category: prod.category,
                    image: prod.image,
                    price: prod.price,
                    quantity: qty,
                    subtotal: subtotal
                };
            });

            const totalAmount = items.reduce((s, it) => s + it.subtotal, 0);

            // Giảm giá ngẫu nhiên (0%, 5%, 10%, 15%)
            const discountPct = [0, 0, 0, 5, 10, 15][randomInt(0, 5)];
            const discount = Math.round(totalAmount * discountPct / 100);
            const finalAmount = totalAmount - discount;

            // paymentStatus theo trạng thái đơn hàng
            let paymentStatus = 'unpaid';
            if (status === 'delivered') {
                paymentStatus = 'paid';
            } else if (status === 'returned') {
                paymentStatus = 'refunded';
            } else if (status === 'confirmed' || status === 'shipping') {
                paymentStatus = payMethod !== 'COD' ? 'paid' : 'unpaid';
            } else if (status === 'cancelled') {
                paymentStatus = Math.random() > 0.7 ? 'refunded' : 'unpaid';
            }

            const createdAt = randomDate(startDate, endDate);

            orders.push({
                orderCode: generateOrderCode(i),
                customer: { ...customer },
                items,
                totalAmount,
                discount,
                finalAmount,
                status,
                paymentMethod: payMethod,
                paymentStatus,
                note: notes[randomInt(0, notes.length - 1)],
                createdAt,
                updatedAt: createdAt
            });
        }

        // Sắp xếp theo ngày tạo tăng dần
        orders.sort((a, b) => a.createdAt - b.createdAt);

        const inserted = await Order.insertMany(orders);
        console.log(`✅ Đã chèn ${inserted.length} đơn hàng vào database!\n`);

        // ─── Thống kê chi tiết ────────────────────────────────────────────────
        const byStatus = {};
        const byPayment = {};
        const byCity = {};
        let totalRevenue = 0;
        let deliveredRevenue = 0;

        inserted.forEach(o => {
            byStatus[o.status] = (byStatus[o.status] || 0) + 1;
            byPayment[o.paymentMethod] = (byPayment[o.paymentMethod] || 0) + 1;
            byCity[o.customer.city] = (byCity[o.customer.city] || 0) + 1;
            totalRevenue += o.finalAmount;
            if (o.status === 'delivered') deliveredRevenue += o.finalAmount;
        });

        console.log('📊 Trạng thái đơn hàng:');
        const statusLabel = {
            delivered: '✅ Đã giao', shipping: '🚚 Đang giao',
            confirmed: '☑️  Đã xác nhận', pending: '⏳ Chờ xử lý',
            cancelled: '❌ Đã hủy', returned: '↩️  Trả hàng'
        };
        Object.entries(byStatus).sort((a, b) => b[1] - a[1]).forEach(([s, c]) =>
            console.log(`   ${statusLabel[s] || s}: ${c} đơn`)
        );

        console.log('\n💳 Phương thức thanh toán:');
        Object.entries(byPayment).sort((a, b) => b[1] - a[1]).forEach(([m, c]) =>
            console.log(`   ${m.toUpperCase()}: ${c} đơn`)
        );

        console.log('\n🌆 Thành phố:');
        Object.entries(byCity).sort((a, b) => b[1] - a[1]).forEach(([city, c]) =>
            console.log(`   ${city}: ${c} đơn`)
        );

        const amounts = inserted.map(o => o.finalAmount);
        console.log(`\n💰 Doanh thu tổng:     ${totalRevenue.toLocaleString('vi-VN')} VNĐ`);
        console.log(`💰 Doanh thu đã giao:  ${deliveredRevenue.toLocaleString('vi-VN')} VNĐ`);
        console.log(`💰 Giá trị đơn thấp:   ${Math.min(...amounts).toLocaleString('vi-VN')} VNĐ`);
        console.log(`💰 Giá trị đơn cao:    ${Math.max(...amounts).toLocaleString('vi-VN')} VNĐ`);
        console.log(`💰 Giá trị đơn TB:     ${Math.round(totalRevenue / inserted.length).toLocaleString('vi-VN')} VNĐ`);

        console.log('\n🔍 5 đơn hàng gần nhất:');
        inserted.slice(-5).reverse().forEach(o => {
            console.log(`   [${o.orderCode}] ${o.customer.fullName} - ${o.finalAmount.toLocaleString('vi-VN')} VNĐ - ${o.status} - ${o.createdAt.toLocaleDateString('vi-VN')}`);
        });

        console.log('\n🚀 Seed đơn hàng hoàn tất! Sẵn sàng test MCP server.');
    } catch (err) {
        console.error('❌ Lỗi:', err);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Đã ngắt kết nối DB.');
    }
}

seedOrders();
