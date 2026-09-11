require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sportShopDB';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ DB Connected (' + (MONGODB_URI.includes('mongodb+srv') ? 'Cloud Atlas' : 'Local') + ')'))
    .catch(err => { console.error('❌ DB Error:', err); process.exit(1); });

const products = [
    // ========== GIÀY (20 sản phẩm) ==========
    {
        name: 'Nike Air Max 90',
        price: 3500000,
        category: 'Giày',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
        description: 'Đôi giày huyền thoại với thiết kế vượt thời gian và đệm khí êm ái. Phù hợp cho mọi hoạt động thể thao và thời trang đường phố.',
        createdAt: new Date('2025-01-15')
    },
    {
        name: 'Nike Air Force 1 Low',
        price: 2800000,
        category: 'Giày',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=500&q=80',
        description: 'Giày cổ thấp kinh điển với đế cao su chắc chắn, thích hợp cho phong cách streetwear hiện đại.',
        createdAt: new Date('2025-02-10')
    },
    {
        name: 'Nike React Infinity Run',
        price: 3200000,
        category: 'Giày',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=500&q=80',
        description: 'Giày chạy bộ với đệm React siêu êm, thiết kế ôm chân hoàn hảo giúp giảm chấn thương.',
        createdAt: new Date('2025-03-05')
    },
    {
        name: 'Jordan 1 Retro High OG',
        price: 5600000,
        category: 'Giày',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80',
        description: 'Biểu tượng của văn hóa sneaker, mang đến phong cách nổi bật và cá tính riêng không thể lẫn.',
        createdAt: new Date('2025-01-20')
    },
    {
        name: 'Nike Zoom Pegasus 40',
        price: 2900000,
        category: 'Giày',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1556048219-bb6978360b84?auto=format&fit=crop&w=500&q=80',
        description: 'Giày chạy đa năng với công nghệ Zoom Air cho cảm giác nhẹ nhàng và phản hồi tốt.',
        createdAt: new Date('2025-04-12')
    },
    {
        name: 'Adidas Ultraboost 23',
        price: 4200000,
        category: 'Giày',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1587563871167-1ee7c7358bcc?auto=format&fit=crop&w=500&q=80',
        description: 'Trải nghiệm sự thoải mái tối đa với công nghệ đệm Boost hoàn trả năng lượng mỗi bước chân.',
        createdAt: new Date('2025-02-20')
    },
    {
        name: 'Adidas Stan Smith',
        price: 2100000,
        category: 'Giày',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80',
        description: 'Giày tennis cổ điển trắng tinh với 3 sọc xanh biểu tượng, không bao giờ lỗi mốt.',
        createdAt: new Date('2025-03-18')
    },
    {
        name: 'Adidas Samba OG',
        price: 2600000,
        category: 'Giày',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500&q=80',
        description: 'Giày Samba huyền thoại với thiết kế retro, kết hợp hoàn hảo giữa phong cách và công năng.',
        createdAt: new Date('2025-05-08')
    },
    {
        name: 'Adidas NMD R1',
        price: 3100000,
        category: 'Giày',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1578116922645-3976907a7671?auto=format&fit=crop&w=500&q=80',
        description: 'Giày lifestyle với công nghệ Boost và Primeknit thoáng khí, thoải mái suốt ngày dài.',
        createdAt: new Date('2025-06-14')
    },
    {
        name: 'Adidas Predator Accuracy',
        price: 2400000,
        category: 'Giày',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=500&q=80',
        description: 'Giày bóng đá với công nghệ Controlskin giúp kiểm soát bóng tốt hơn trong mọi điều kiện.',
        createdAt: new Date('2025-07-01')
    },
    {
        name: 'Puma RS-X Reinvention',
        price: 2200000,
        category: 'Giày',
        brand: 'PUMA',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80',
        description: 'Giày chunky sneaker với thiết kế đa màu sắc nổi bật, lấy cảm hứng từ văn hóa thể thao thập niên 80.',
        createdAt: new Date('2025-02-28')
    },
    {
        name: 'Puma Suede Classic',
        price: 1800000,
        category: 'Giày',
        brand: 'PUMA',
        image: 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=500&q=80',
        description: 'Giày lộng lẫy với chất liệu da lộn mịn màng, đế cao su bền bỉ, phong cách cổ điển bất hủ.',
        createdAt: new Date('2025-04-22')
    },
    {
        name: 'New Balance 574',
        price: 2300000,
        category: 'Giày',
        brand: 'NEW BALANCE',
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=500&q=80',
        description: 'Giày chạy bộ cổ điển với đệm ENCAP bảo vệ tốt, thiết kế retro luôn hợp thời.',
        createdAt: new Date('2025-05-30')
    },
    {
        name: 'New Balance 990v6',
        price: 4800000,
        category: 'Giày',
        brand: 'NEW BALANCE',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
        description: 'Đỉnh cao của dòng 990, made in USA với vật liệu cao cấp nhất và sự thoải mái vượt trội.',
        createdAt: new Date('2025-06-25')
    },
    {
        name: 'Converse Chuck Taylor All Star',
        price: 1500000,
        category: 'Giày',
        brand: 'CONVERSE',
        image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=500&q=80',
        description: 'Giày canvas cổ điển không bao giờ lỗi mốt với đế cao su và thân vải bền chắc.',
        createdAt: new Date('2025-01-30')
    },
    {
        name: 'Converse Run Star Hike',
        price: 2500000,
        category: 'Giày',
        brand: 'CONVERSE',
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=500&q=80',
        description: 'Phiên bản nâng cấp của Chuck Taylor với đế chunky đặc trưng, tạo điểm nhấn thời trang.',
        createdAt: new Date('2025-07-15')
    },
    {
        name: 'Vans Old Skool',
        price: 1600000,
        category: 'Giày',
        brand: 'VANS',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80',
        description: 'Giày skate huyền thoại với sọc Jazz sọc đặc trưng, bền bỉ cho mọi địa hình.',
        createdAt: new Date('2025-03-10')
    },
    {
        name: 'Vans Authentic',
        price: 1300000,
        category: 'Giày',
        brand: 'VANS',
        image: 'https://images.unsplash.com/photo-1613987876445-fcb353cd8e27?auto=format&fit=crop&w=500&q=80',
        description: 'Giày canvas đơn giản nhưng phong cách, phù hợp mọi outfit từ casual đến sporty.',
        createdAt: new Date('2025-04-05')
    },
    {
        name: 'Under Armour HOVR Phantom 3',
        price: 3400000,
        category: 'Giày',
        brand: 'UNDER ARMOUR',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80',
        description: 'Công nghệ HOVR mang lại cảm giác "không trọng lực" khi chạy, kết nối với app UA MapMyRun.',
        createdAt: new Date('2025-05-20')
    },
    {
        name: 'Reebok Classic Leather',
        price: 1900000,
        category: 'Giày',
        brand: 'REEBOK',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
        description: 'Giày da cổ điển thập niên 80 với thiết kế đơn giản, thanh lịch và bền bỉ theo thời gian.',
        createdAt: new Date('2025-06-08')
    },

    // ========== ÁO (12 sản phẩm) ==========
    {
        name: 'Nike Dri-FIT Training T-Shirt',
        price: 750000,
        category: 'Áo',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=500&q=80',
        description: 'Áo thun thể thao với công nghệ Dri-FIT thấm hút mồ hôi nhanh, giữ khô thoáng suốt buổi tập.',
        createdAt: new Date('2025-01-25')
    },
    {
        name: 'Nike Pro Combat Compression',
        price: 850000,
        category: 'Áo',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=500&q=80',
        description: 'Áo nén hỗ trợ cơ bắp, tăng cường tuần hoàn máu và giảm mệt mỏi khi tập luyện.',
        createdAt: new Date('2025-02-15')
    },
    {
        name: 'Nike Sportswear Club Fleece Hoodie',
        price: 1450000,
        category: 'Áo',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&w=500&q=80',
        description: 'Áo hoodie cotton fleece siêu mềm mại với túi kangaroo tiện lợi, ấm áp cho mùa lạnh.',
        createdAt: new Date('2025-03-20')
    },
    {
        name: 'Adidas Essentials 3-Stripes T-Shirt',
        price: 650000,
        category: 'Áo',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=500&q=80',
        description: 'Áo thun cơ bản với 3 sọc Adidas biểu tượng, chất cotton thoáng mát và thấm hút tốt.',
        createdAt: new Date('2025-01-10')
    },
    {
        name: 'Adidas Techfit Compression Tee',
        price: 900000,
        category: 'Áo',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=500&q=80',
        description: 'Áo compression Techfit hỗ trợ cơ bắp tối ưu, vải AEROREADY kiểm soát độ ẩm hiệu quả.',
        createdAt: new Date('2025-04-18')
    },
    {
        name: 'Under Armour Tech 2.0 T-Shirt',
        price: 700000,
        category: 'Áo',
        brand: 'UNDER ARMOUR',
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=500&q=80',
        description: 'Áo thun nhẹ với vải thấm ẩm nhanh, cảm giác như mặc áo cotton nhưng hiệu năng thể thao.',
        createdAt: new Date('2025-05-12')
    },
    {
        name: 'Puma Training Jersey',
        price: 680000,
        category: 'Áo',
        brand: 'PUMA',
        image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=500&q=80',
        description: 'Áo tập luyện nhẹ với logo Puma nổi bật, thiết kế thoáng khí cho mọi môn thể thao.',
        createdAt: new Date('2025-06-02')
    },
    {
        name: 'Nike Paris Saint-Germain 2025 Home Jersey',
        price: 1800000,
        category: 'Áo',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&w=500&q=80',
        description: 'Áo đấu chính thức PSG mùa giải 2025, vải Dri-FIT ADV cao cấp dành cho fan cuồng nhiệt.',
        createdAt: new Date('2025-07-10')
    },
    {
        name: 'Adidas Real Madrid Away Jersey',
        price: 1750000,
        category: 'Áo',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&w=500&q=80',
        description: 'Áo đấu sân khách Real Madrid với công nghệ HEAT.RDY giữ mát cho cầu thủ trong điều kiện nóng.',
        createdAt: new Date('2025-07-18')
    },
    {
        name: 'New Balance Athletics Amplified Tee',
        price: 720000,
        category: 'Áo',
        brand: 'NEW BALANCE',
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=500&q=80',
        description: 'Áo thun với thiết kế graphic độc đáo, chất liệu cotton blend thoải mái cho lifestyle.',
        createdAt: new Date('2025-05-25')
    },
    {
        name: 'Reebok Identity Training Tee',
        price: 580000,
        category: 'Áo',
        brand: 'REEBOK',
        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=500&q=80',
        description: 'Áo thun đơn giản với logo Reebok vector, phù hợp cho tập gym và hoạt động thường ngày.',
        createdAt: new Date('2025-03-28')
    },
    {
        name: 'Champion Reverse Weave Hoodie',
        price: 1200000,
        category: 'Áo',
        brand: 'CHAMPION',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&w=500&q=80',
        description: 'Hoodie cotton dày dặn với công nghệ dệt ngược giúp chống co rút, biểu tượng của streetwear.',
        createdAt: new Date('2025-06-20')
    },

    // ========== ÁO KHOÁC (8 sản phẩm) ==========
    {
        name: 'Nike Therma-FIT Repel Running Jacket',
        price: 2800000,
        category: 'Áo khoác',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80',
        description: 'Áo khoác chạy bộ chống gió và nước nhẹ với công nghệ Therma-FIT giữ ấm tối ưu.',
        createdAt: new Date('2025-01-05')
    },
    {
        name: 'Adidas Own the Run Jacket',
        price: 2200000,
        category: 'Áo khoác',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80',
        description: 'Áo khoác chạy bộ với vải AEROREADY thấm ẩm nhanh, thiết kế phản quang an toàn ban đêm.',
        createdAt: new Date('2025-02-08')
    },
    {
        name: 'Nike Windrunner Jacket',
        price: 2500000,
        category: 'Áo khoác',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80',
        description: 'Áo khoác gió nhẹ kinh điển với thiết kế chevron ngực đặc trưng của Nike, gấp gọn tiện mang.',
        createdAt: new Date('2025-03-15')
    },
    {
        name: 'Under Armour Storm Rogue Jacket',
        price: 3100000,
        category: 'Áo khoác',
        brand: 'UNDER ARMOUR',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=500&q=80',
        description: 'Áo khoác chống nước UA Storm với công nghệ phủ nano DWR, giữ khô trong mọi điều kiện.',
        createdAt: new Date('2025-04-28')
    },
    {
        name: 'Puma Evostripe Jacket',
        price: 1800000,
        category: 'Áo khoác',
        brand: 'PUMA',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80',
        description: 'Áo khoác track jacket với công nghệ DryCell thấm hút, túi kéo khóa tiện lợi.',
        createdAt: new Date('2025-05-05')
    },
    {
        name: 'New Balance Athletics Track Jacket',
        price: 2000000,
        category: 'Áo khoác',
        brand: 'NEW BALANCE',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80',
        description: 'Áo khoác track retro với màu sắc tươi sáng, chất liệu tricot nhẹ và bóng đặc trưng.',
        createdAt: new Date('2025-06-18')
    },
    {
        name: 'Adidas Tiro 23 Training Jacket',
        price: 1650000,
        category: 'Áo khoác',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80',
        description: 'Áo khoác bóng đá Tiro nổi tiếng với vải AEROREADY, thiết kế gọn nhẹ cho buổi tập đội.',
        createdAt: new Date('2025-07-08')
    },
    {
        name: 'Nike NSW Synthetic Fill Gilet',
        price: 2300000,
        category: 'Áo khoác',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=500&q=80',
        description: 'Áo gile độn bông nhẹ giữ ấm phần thân, không cản trở chuyển động của tay khi vận động.',
        createdAt: new Date('2025-07-22')
    },

    // ========== QUẦN (10 sản phẩm) ==========
    {
        name: 'Adidas Tiro 23 Training Pants',
        price: 990000,
        category: 'Quần',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
        description: 'Quần tập luyện co giãn đa chiều, thấm hút mồ hôi tốt với đường sọc 3 vạch đặc trưng.',
        createdAt: new Date('2025-01-08')
    },
    {
        name: 'Nike Dri-FIT Training Shorts',
        price: 780000,
        category: 'Quần',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07bf10?auto=format&fit=crop&w=500&q=80',
        description: 'Quần short thể thao với công nghệ Dri-FIT, đường thoáng khí hai bên hông linh hoạt khi vận động.',
        createdAt: new Date('2025-02-12')
    },
    {
        name: 'Under Armour HeatGear Compression Shorts',
        price: 850000,
        category: 'Quần',
        brand: 'UNDER ARMOUR',
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07bf10?auto=format&fit=crop&w=500&q=80',
        description: 'Quần nén HeatGear hỗ trợ cơ bắp bắp đùi, thấm hút mồ hôi trong điều kiện thời tiết nóng.',
        createdAt: new Date('2025-03-22')
    },
    {
        name: 'Nike Pro Tight Training Leggings',
        price: 950000,
        category: 'Quần',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=500&q=80',
        description: 'Quần leggings Pro ôm sát hỗ trợ cơ bắp, vải Dri-FIT co giãn 4 chiều phù hợp yoga và gym.',
        createdAt: new Date('2025-04-10')
    },
    {
        name: 'Adidas Essentials Slim Tapered Pants',
        price: 890000,
        category: 'Quần',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=500&q=80',
        description: 'Quần jogger slim-fit với vải French Terry mềm mại, phù hợp cả tập luyện và thời trang.',
        createdAt: new Date('2025-05-16')
    },
    {
        name: 'Puma Active Woven Shorts',
        price: 650000,
        category: 'Quần',
        brand: 'PUMA',
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07bf10?auto=format&fit=crop&w=500&q=80',
        description: 'Quần short dệt thoi nhẹ với túi kéo khóa hai bên, thoáng mát cho các môn thể thao ngoài trời.',
        createdAt: new Date('2025-06-05')
    },
    {
        name: 'New Balance Accelerate Pacer Short',
        price: 720000,
        category: 'Quần',
        brand: 'NEW BALANCE',
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07bf10?auto=format&fit=crop&w=500&q=80',
        description: 'Quần short chạy bộ nhẹ với lớp lót trong thoải mái, thiết kế thoáng gió tối ưu.',
        createdAt: new Date('2025-07-03')
    },
    {
        name: 'Under Armour Rival Fleece Joggers',
        price: 1100000,
        category: 'Quần',
        brand: 'UNDER ARMOUR',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=500&q=80',
        description: 'Quần jogger fleece dày dặn với gấu chun co giãn, ấm áp và thoải mái cho mùa đông.',
        createdAt: new Date('2025-07-25')
    },
    {
        name: 'Nike Club Fleece Jogger Pants',
        price: 1050000,
        category: 'Quần',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=500&q=80',
        description: 'Quần jogger Club Fleece thoải mái, vải cotton mềm mịn với logo Swoosh nhỏ tinh tế.',
        createdAt: new Date('2025-06-30')
    },
    {
        name: 'Reebok Identity Training Shorts',
        price: 600000,
        category: 'Quần',
        brand: 'REEBOK',
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07bf10?auto=format&fit=crop&w=500&q=80',
        description: 'Quần short đa năng phù hợp gym và CrossFit, vải nhẹ thoáng với công nghệ SpeedWick.',
        createdAt: new Date('2025-05-28')
    },

    // ========== PHỤ KIỆN (10 sản phẩm) ==========
    {
        name: 'Nike Sport Backpack 30L',
        price: 1350000,
        category: 'Phụ kiện',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80',
        description: 'Balo thể thao dung tích 30L với ngăn đựng laptop 15 inch, thiết kế thoáng lưng giảm mồ hôi.',
        createdAt: new Date('2025-01-18')
    },
    {
        name: 'Adidas Linear Sport Backpack',
        price: 980000,
        category: 'Phụ kiện',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80',
        description: 'Balo Adidas thiết kế gọn nhẹ với 3 sọc cạnh sườn, đủ không gian cho đồ tập và giày.',
        createdAt: new Date('2025-02-25')
    },
    {
        name: 'Nike Dri-FIT Headband',
        price: 280000,
        category: 'Phụ kiện',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=500&q=80',
        description: 'Băng đầu thấm mồ hôi với công nghệ Dri-FIT, giữ tóc gọn gàng trong khi tập luyện.',
        createdAt: new Date('2025-03-12')
    },
    {
        name: 'Adidas Sport Wristband 2-Pack',
        price: 180000,
        category: 'Phụ kiện',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=500&q=80',
        description: 'Bộ 2 băng cổ tay thấm hút mồ hôi, bảo vệ cổ tay trong quá trình tập luyện cường độ cao.',
        createdAt: new Date('2025-04-08')
    },
    {
        name: 'Nike Everyday Cushioned Socks 6-Pack',
        price: 450000,
        category: 'Phụ kiện',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=500&q=80',
        description: 'Bộ 6 đôi tất thể thao có đệm mềm ở mũi và gót, co giãn tốt phù hợp mọi loại giày.',
        createdAt: new Date('2025-05-02')
    },
    {
        name: 'Under Armour UA Storm Undeniable Duffle',
        price: 1650000,
        category: 'Phụ kiện',
        brand: 'UNDER ARMOUR',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80',
        description: 'Túi xách thể thao chống nước UA Storm dung tích lớn, ngăn giày riêng biệt tiện lợi.',
        createdAt: new Date('2025-06-10')
    },
    {
        name: 'Puma Training Gloves',
        price: 380000,
        category: 'Phụ kiện',
        brand: 'PUMA',
        image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=500&q=80',
        description: 'Găng tay tập gym với lòng bàn tay đệm silicone, bảo vệ tay và tăng độ bám khi nâng tạ.',
        createdAt: new Date('2025-07-05')
    },
    {
        name: 'Nike Pro Elbow Sleeve',
        price: 420000,
        category: 'Phụ kiện',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=500&q=80',
        description: 'Ống tay khuỷu tay compression hỗ trợ khớp và giảm đau khi tập luyện cường độ cao.',
        createdAt: new Date('2025-07-20')
    },
    {
        name: 'Adidas Tiro League Ball Size 5',
        price: 650000,
        category: 'Phụ kiện',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=500&q=80',
        description: 'Bóng đá Tiro League kích cỡ 5 tiêu chuẩn FIFA với thiết kế 12 tấm, bền và cân bằng tốt.',
        createdAt: new Date('2025-03-30')
    },
    {
        name: 'Nike Sport Cap Dri-FIT',
        price: 520000,
        category: 'Phụ kiện',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=80',
        description: 'Mũ lưỡi trai thể thao với vải Dri-FIT thấm mồ hôi, dải điều chỉnh phía sau thoải mái.',
        createdAt: new Date('2025-05-15')
    },

    // ========== THIẾT BỊ THỂ THAO (5 sản phẩm) ==========
    {
        name: 'Nike Resistance Band Set',
        price: 350000,
        category: 'Thiết bị',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=500&q=80',
        description: 'Bộ 5 dây kháng lực đa mức độ từ nhẹ đến nặng, lý tưởng cho tập phục hồi và gia tăng sức mạnh.',
        createdAt: new Date('2025-02-05')
    },
    {
        name: 'Adidas Training Knee Support',
        price: 480000,
        category: 'Thiết bị',
        brand: 'ADIDAS',
        image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=500&q=80',
        description: 'Băng hỗ trợ đầu gối với độ nén vừa phải, bảo vệ khớp khi chạy bộ và thể thao mạnh.',
        createdAt: new Date('2025-03-25')
    },
    {
        name: 'Nike Jump Rope Speed',
        price: 290000,
        category: 'Thiết bị',
        brand: 'NIKE',
        image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=500&q=80',
        description: 'Dây nhảy tốc độ với bearing kép, tay cầm công thái học chống trơn trượt, điều chỉnh độ dài dễ dàng.',
        createdAt: new Date('2025-04-15')
    },
    {
        name: 'Under Armour Foam Roller',
        price: 780000,
        category: 'Thiết bị',
        brand: 'UNDER ARMOUR',
        image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=500&q=80',
        description: 'Con lăn foam massage cơ với mật độ vừa phải, giúp phục hồi cơ nhanh và giảm đau nhức hiệu quả.',
        createdAt: new Date('2025-06-22')
    },
    {
        name: 'Puma Water Bottle 750ml',
        price: 320000,
        category: 'Thiết bị',
        brand: 'PUMA',
        image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=500&q=80',
        description: 'Bình nước thể thao 750ml không BPA với nắp chống rò rỉ, thiết kế ergonomic dễ cầm khi chạy.',
        createdAt: new Date('2025-07-12')
    }
];

async function seedDatabase() {
    try {
        await Product.deleteMany({});
        console.log('🗑️  Đã xóa dữ liệu cũ');

        const inserted = await Product.insertMany(products);
        console.log(`✅ Đã chèn ${inserted.length} sản phẩm vào database!\n`);

        // Thống kê theo danh mục
        const categories = {};
        const brands = {};
        inserted.forEach(p => {
            categories[p.category] = (categories[p.category] || 0) + 1;
            brands[p.brand] = (brands[p.brand] || 0) + 1;
        });

        console.log('📊 Thống kê theo danh mục:');
        Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
            console.log(`   ${cat}: ${count} sản phẩm`);
        });

        console.log('\n🏷️  Thống kê theo thương hiệu:');
        Object.entries(brands).sort((a, b) => b[1] - a[1]).forEach(([brand, count]) => {
            console.log(`   ${brand}: ${count} sản phẩm`);
        });

        const prices = inserted.map(p => p.price);
        console.log(`\n💰 Giá thấp nhất:  ${Math.min(...prices).toLocaleString('vi-VN')} VNĐ`);
        console.log(`💰 Giá cao nhất:   ${Math.max(...prices).toLocaleString('vi-VN')} VNĐ`);
        console.log(`💰 Giá trung bình: ${Math.round(prices.reduce((a, b) => a + b, 0) / prices.length).toLocaleString('vi-VN')} VNĐ`);

        console.log('\n🚀 Seed hoàn tất! Bạn có thể test MCP server ngay bây giờ.');
    } catch (err) {
        console.error('❌ Lỗi:', err);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Đã ngắt kết nối DB.');
    }
}

seedDatabase();
