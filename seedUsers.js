require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sportShopDB';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ DB Connected (' + (MONGODB_URI.includes('mongodb+srv') ? 'Cloud Atlas' : 'Local') + ')'))
    .catch(err => { console.error('❌ DB Error:', err); process.exit(1); });

const users = [
    // ── Admin accounts ──────────────────────────────────────
    {
        fullName: 'Super Admin',
        email:    'admin@sportshop.vn',
        password: 'Admin@123',
        role:     'admin'
    },
    {
        fullName: 'Nguyễn Quản Lý',
        email:    'manager@sportshop.vn',
        password: 'Manager@123',
        role:     'admin'
    },

    // ── User accounts ────────────────────────────────────────
    {
        fullName: 'Nguyễn Văn Khách',
        email:    'user1@gmail.com',
        password: 'User@123',
        role:     'user'
    },
    {
        fullName: 'Trần Thị Mua',
        email:    'user2@gmail.com',
        password: 'User@123',
        role:     'user'
    },
    {
        fullName: 'Lê Hoàng Khách Hàng',
        email:    'khachhang@gmail.com',
        password: 'User@123',
        role:     'user'
    }
];

async function seedUsers() {
    try {
        await User.deleteMany({});
        console.log('🗑️  Đã xóa users cũ\n');

        // Tạo từng user để hook pre('save') chạy hash password
        const created = [];
        for (const u of users) {
            const newUser = new User(u);
            await newUser.save();
            created.push(newUser);
        }

        console.log(`✅ Đã tạo ${created.length} tài khoản:\n`);
        console.log('  Role   | Email                    | Password');
        console.log('  -------|--------------------------|------------');
        users.forEach(u => {
            const role = u.role.padEnd(6);
            const email = u.email.padEnd(25);
            console.log(`  ${role} | ${email} | ${u.password}`);
        });

        console.log('\n🚀 Seed users hoàn tất!');
    } catch (err) {
        console.error('❌ Lỗi:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Đã ngắt kết nối DB.');
    }
}

seedUsers();
