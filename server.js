require('dotenv').config();
const express      = require('express');
const mongoose     = require('mongoose');
const session      = require('express-session');
const methodOverride = require('method-override');
const multer       = require('multer');
const path         = require('path');
const app          = express();

const Product = require('./models/Product');
const User    = require('./models/User');
const { isLoggedIn, isAdmin } = require('./middleware/auth');

// ── Database ─────────────────────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sportShopDB';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB (' + (MONGODB_URI.includes('mongodb+srv') ? 'Cloud Atlas' : 'Local') + ')'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ── App config ────────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // parse JSON body cho /api/* routes

app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'sportshop_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Truyền session vào tất cả views
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// ── File upload ───────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ════════════════════════════════════════════════════════════════════════════
// AUTH ROUTES
// ════════════════════════════════════════════════════════════════════════════

// GET /login
app.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('auth/login', { error: null, formData: {} });
});

// POST /login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.render('auth/login', {
                error: 'Email không tồn tại trong hệ thống.',
                formData: { email }
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('auth/login', {
                error: 'Mật khẩu không chính xác.',
                formData: { email }
            });
        }

        // Lưu thông tin user vào session
        req.session.user = {
            _id:      user._id,
            fullName: user.fullName,
            email:    user.email,
            role:     user.role
        };

        // Redirect về trang trước đó nếu có, hoặc về trang chủ
        const returnTo = req.session.returnTo || '/';
        delete req.session.returnTo;
        res.redirect(returnTo);

    } catch (err) {
        console.error(err);
        res.render('auth/login', { error: 'Đã có lỗi xảy ra, vui lòng thử lại.', formData: { email } });
    }
});

// GET /register
app.get('/register', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('auth/register', { error: null, success: null, formData: {} });
});

// POST /register
app.post('/register', async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;
    try {
        if (password !== confirmPassword) {
            return res.render('auth/register', {
                error: 'Mật khẩu xác nhận không khớp.',
                success: null,
                formData: { fullName, email }
            });
        }
        if (password.length < 6) {
            return res.render('auth/register', {
                error: 'Mật khẩu phải có ít nhất 6 ký tự.',
                success: null,
                formData: { fullName, email }
            });
        }

        const existing = await User.findOne({ email: email.toLowerCase().trim() });
        if (existing) {
            return res.render('auth/register', {
                error: 'Email này đã được đăng ký.',
                success: null,
                formData: { fullName, email }
            });
        }

        // Tạo user mới — bcrypt hash chạy qua pre('save') hook
        const newUser = new User({
            fullName: fullName.trim(),
            email:    email.toLowerCase().trim(),
            password,
            role:     'user'   // Register luôn là user; admin tạo qua seed/DB
        });
        await newUser.save();

        // Tự đăng nhập sau khi đăng ký
        req.session.user = {
            _id:      newUser._id,
            fullName: newUser.fullName,
            email:    newUser.email,
            role:     newUser.role
        };
        res.redirect('/');

    } catch (err) {
        console.error(err);
        res.render('auth/register', {
            error: 'Đã có lỗi xảy ra, vui lòng thử lại.',
            success: null,
            formData: { fullName, email }
        });
    }
});

// POST /logout
app.post('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

// ════════════════════════════════════════════════════════════════════════════
// STORE ROUTES (Public)
// ════════════════════════════════════════════════════════════════════════════

app.get('/seed', async (req, res) => {
    await Product.deleteMany({});
    await Product.insertMany([
        { name: 'Nike Air Max 90',    price: 3500000, category: 'Giày',      brand: 'NIKE',   image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80', description: 'Đôi giày huyền thoại với thiết kế vượt thời gian và đệm khí êm ái.' },
        { name: 'Adidas Ultraboost',  price: 4200000, category: 'Giày',      brand: 'ADIDAS', image: 'https://images.unsplash.com/photo-1587563871167-1ee7c7358bcc?auto=format&fit=crop&w=500&q=80', description: 'Trải nghiệm sự thoải mái tối đa với công nghệ đệm Boost hoàn trả năng lượng.' },
        { name: 'Nike Sportswear Tee',price: 850000,  category: 'Áo',        brand: 'NIKE',   image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=500&q=80', description: 'Áo phông cotton mềm mại, thoáng mát cho ngày dài năng động.' },
        { name: 'Running Jacket',     price: 1200000, category: 'Áo khoác',  brand: 'ADIDAS', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80', description: 'Áo khoác chạy bộ chống nước nhẹ, thiết kế phản quang an toàn.' },
        { name: 'Jordan 1 Retro High',price: 5600000, category: 'Giày',      brand: 'NIKE',   image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80', description: 'Biểu tượng của văn hóa sneaker, mang đến phong cách nổi bật và cá tính.' },
        { name: 'Training Pants',     price: 990000,  category: 'Quần',      brand: 'ADIDAS', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80', description: 'Quần tập luyện co giãn đa chiều, thấm hút mồ hôi tốt.' }
    ]);
    res.send("Seed completed! <a href='/'>Go home</a>");
});

app.get('/', async (req, res) => {
    const products = await Product.find({});
    let cartCount = 0;
    if (req.session.cart) {
        cartCount = req.session.cart.reduce((total, item) => total + item.quantity, 0);
    }
    res.render('index', { products: products, cartCount: cartCount });
});

app.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.redirect('/');
        let cartCount = 0;
        if (req.session.cart) {
            cartCount = req.session.cart.reduce((total, item) => total + item.quantity, 0);
        }
        res.render('product_detail', { product: product, cartCount: cartCount });
    } catch (error) {
        res.redirect('/');
    }
});

app.post('/cart/add/:id', isLoggedIn, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    
    if (!product) return res.redirect('/');
    
    if (!req.session.cart) {
        req.session.cart = [];
    }
    
    const existingItemIndex = req.session.cart.findIndex(item => item.product._id == productId);
    
    if (existingItemIndex > -1) {
        req.session.cart[existingItemIndex].quantity += 1;
    } else {
        req.session.cart.push({
            product: product,
            quantity: 1
        });
    }
    
    res.redirect('/');
});

app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    let total = 0;
    cart.forEach(item => {
        total += item.product.price * item.quantity;
    });
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    res.render('cart', { cart: cart, total: total, cartCount: cartCount });
});

app.post('/cart/remove/:id', isLoggedIn, (req, res) => {
    if (req.session.cart) {
        req.session.cart = req.session.cart.filter(item => item.product._id != req.params.id);
    }
    res.redirect('/cart');
});

app.post('/cart/update/:id', isLoggedIn, (req, res) => {
    const { action } = req.body;
    if (req.session.cart) {
        const item = req.session.cart.find(item => item.product._id == req.params.id);
        if (item) {
            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease' && item.quantity > 1) {
                item.quantity -= 1;
            }
        }
    }
    res.redirect('/cart');
});

app.get('/checkout', isLoggedIn, (req, res) => {
    const cart = req.session.cart || [];
    if (cart.length === 0) return res.redirect('/cart');
    let total = 0;
    cart.forEach(item => {
        total += item.product.price * item.quantity;
    });
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    res.render('checkout', { cart: cart, total: total, cartCount: cartCount });
});

app.post('/checkout', isLoggedIn, (req, res) => {
    // Mock checkout process
    req.session.cart = [];
    res.send("<div style='text-align:center; padding: 50px; font-family: sans-serif;'><h2>Đặt Hàng Thành Công!</h2><p>Cảm ơn bạn đã mua sắm tại SportShop.</p><a href='/' style='display:inline-block; padding: 10px 20px; background: #111; color:#fff; text-decoration:none; border-radius:5px;'>Về Trang Chủ</a></div>");
});

app.get('/admin', isLoggedIn, isAdmin, async (req, res) => {
    const totalProducts = await Product.countDocuments();
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5);
    res.render('admin/dashboard', { totalProducts, recentProducts });
});

app.get('/admin/products', isLoggedIn, isAdmin, async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.render('admin/products/index', { products });
});

app.get('/admin/products/new', isLoggedIn, isAdmin, (req, res) => {
    res.render('admin/products/new');
});

app.post('/admin/products', isLoggedIn, isAdmin, upload.single('imageFile'), async (req, res) => {
    const { name, price, category, brand, description, imageUrl } = req.body;
    let finalImage = imageUrl;
    
    if (req.file) {
        finalImage = '/uploads/' + req.file.filename;
    }
    
    await Product.create({
        name,
        price,
        category,
        brand,
        description,
        image: finalImage
    });
    
    res.redirect('/admin/products');
});

app.get('/admin/products/:id/edit', isLoggedIn, isAdmin, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.redirect('/admin/products');
    res.render('admin/products/edit', { product });
});

app.put('/admin/products/:id', isLoggedIn, isAdmin, upload.single('imageFile'), async (req, res) => {
    const { name, price, category, brand, description, imageUrl } = req.body;
    const updateData = { name, price, category, brand, description };
    
    if (req.file) {
        updateData.image = '/uploads/' + req.file.filename;
    } else if (imageUrl) {
        updateData.image = imageUrl;
    }
    
    await Product.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/admin/products');
});

app.delete('/admin/products/:id', isLoggedIn, isAdmin, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
});

// ════════════════════════════════════════════════════════════════════════════
// API ROUTES — dùng X-API-Key header (cho MCP server và external clients)
// ════════════════════════════════════════════════════════════════════════════
const { verifyApiKey, requireAdmin, requireUser } = require('./middleware/apiAuth');
const Order = require('./models/Order');

// Tất cả /api/* trả về JSON
app.use('/api', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// ── POST /api/login ───────────────────────────────────────────────────────────
// Body: { email, password }
// Returns: { apiKey, role, fullName, email }
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'BAD_REQUEST', message: 'Cần cung cấp email và password.' });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, error: 'INVALID_CREDENTIALS', message: 'Email hoặc mật khẩu không đúng.' });
        }

        // Generate key nếu chưa có
        if (!user.apiKey) {
            user.apiKey = User.generateApiKey(user.role);
            await user.save();
        }

        res.json({
            success:  true,
            apiKey:   user.apiKey,
            role:     user.role,
            fullName: user.fullName,
            email:    user.email
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

// ── GET /api/me ───────────────────────────────────────────────────────────────
// Verify API key, trả về thông tin user hiện tại
app.get('/api/me', verifyApiKey, (req, res) => {
    const { _id, fullName, email, role, createdAt } = req.apiUser;
    res.json({ success: true, user: { _id, fullName, email, role, createdAt } });
});

// ── GET /api/products ─────────────────────────────────────────────────────────
// Public — không cần auth. Filter: ?category=&brand=&minPrice=&maxPrice=&sort=price_asc|price_desc|newest
app.get('/api/products', async (req, res) => {
    try {
        const { category, brand, minPrice, maxPrice, sort, search, limit = 50, page = 1 } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (brand)    filter.brand    = brand.toUpperCase();
        if (search)   filter.name     = { $regex: search, $options: 'i' };
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const sortMap = { price_asc: { price: 1 }, price_desc: { price: -1 }, newest: { createdAt: -1 } };
        const sortOpt = sortMap[sort] || { createdAt: -1 };

        const skip  = (Number(page) - 1) * Number(limit);
        const total = await Product.countDocuments(filter);
        const items = await Product.find(filter).sort(sortOpt).skip(skip).limit(Number(limit));

        res.json({ success: true, total, page: Number(page), limit: Number(limit), data: items });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

// ── GET /api/products/:id ─────────────────────────────────────────────────────
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, error: 'INVALID_ID', message: 'ID không hợp lệ.' });
    }
});

// ── POST /api/products ────────────────────────────────────────────────────────
// Admin only
app.post('/api/products', verifyApiKey, requireAdmin, async (req, res) => {
    try {
        const { name, price, category, brand, description, image } = req.body;
        if (!name || !price || !category || !brand || !image) {
            return res.status(400).json({ success: false, error: 'BAD_REQUEST', message: 'Thiếu các trường bắt buộc: name, price, category, brand, image.' });
        }
        const product = await Product.create({ name, price: Number(price), category, brand: brand.toUpperCase(), description, image });
        res.status(201).json({ success: true, message: 'Tạo sản phẩm thành công.', data: product });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

// ── PUT /api/products/:id ─────────────────────────────────────────────────────
// Admin only
app.put('/api/products/:id', verifyApiKey, requireAdmin, async (req, res) => {
    try {
        const { name, price, category, brand, description, image } = req.body;
        const update = {};
        if (name)        update.name        = name;
        if (price)       update.price       = Number(price);
        if (category)    update.category    = category;
        if (brand)       update.brand       = brand.toUpperCase();
        if (description) update.description = description;
        if (image)       update.image       = image;

        const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!product) return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
        res.json({ success: true, message: 'Cập nhật thành công.', data: product });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

// ── DELETE /api/products/:id ──────────────────────────────────────────────────
// Admin only
app.delete('/api/products/:id', verifyApiKey, requireAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
        res.json({ success: true, message: `Đã xóa sản phẩm "${product.name}".` });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

// ── GET /api/orders ───────────────────────────────────────────────────────────
// Admin only. Filter: ?status=&paymentMethod=&city=&from=&to=
app.get('/api/orders', verifyApiKey, requireAdmin, async (req, res) => {
    try {
        const { status, paymentMethod, city, from, to, limit = 50, page = 1 } = req.query;
        const filter = {};

        if (status)        filter.status        = status;
        if (paymentMethod) filter.paymentMethod = paymentMethod;
        if (city)          filter['customer.city'] = city;
        if (from || to) {
            filter.createdAt = {};
            if (from) filter.createdAt.$gte = new Date(from);
            if (to)   filter.createdAt.$lte = new Date(to);
        }

        const skip  = (Number(page) - 1) * Number(limit);
        const total = await Order.countDocuments(filter);
        const items = await Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

        res.json({ success: true, total, page: Number(page), limit: Number(limit), data: items });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

// ── GET /api/orders/stats ─────────────────────────────────────────────────────
// Admin only — thống kê doanh thu
app.get('/api/orders/stats', verifyApiKey, requireAdmin, async (req, res) => {
    try {
        const [statusStats, paymentStats, cityStats, revenueStats, topCustomers] = await Promise.all([
            Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
            Order.aggregate([{ $group: { _id: '$paymentMethod', count: { $sum: 1 } } }]),
            Order.aggregate([{ $group: { _id: '$customer.city', count: { $sum: 1 } } }]),
            Order.aggregate([{
                $group: {
                    _id:          null,
                    totalRevenue: { $sum: '$finalAmount' },
                    totalOrders:  { $sum: 1 },
                    avgOrder:     { $avg: '$finalAmount' },
                    maxOrder:     { $max: '$finalAmount' },
                    minOrder:     { $min: '$finalAmount' }
                }
            }]),
            Order.aggregate([
                { $match: { status: 'delivered' } },
                { $group: { _id: '$customer.email', fullName: { $first: '$customer.fullName' }, totalSpent: { $sum: '$finalAmount' }, orderCount: { $sum: 1 } } },
                { $sort: { totalSpent: -1 } },
                { $limit: 5 }
            ])
        ]);

        res.json({
            success: true,
            data: {
                revenue:      revenueStats[0] || {},
                byStatus:     statusStats,
                byPayment:    paymentStats,
                byCity:       cityStats,
                topCustomers
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

// ── GET /api/orders/:code ─────────────────────────────────────────────────────
// Admin only — chi tiết 1 đơn hàng theo orderCode (SS00001...)
app.get('/api/orders/:code', verifyApiKey, requireAdmin, async (req, res) => {
    try {
        const order = await Order.findOne({ orderCode: req.params.code.toUpperCase() });
        if (!order) return res.status(404).json({ success: false, error: 'NOT_FOUND', message: `Không tìm thấy đơn hàng ${req.params.code}.` });
        res.json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

// ── GET /api/my-orders ────────────────────────────────────────────────────────
// User + Admin — đơn hàng của chính mình (theo email)
app.get('/api/my-orders', verifyApiKey, requireUser, async (req, res) => {
    try {
        const orders = await Order.find({ 'customer.email': req.apiUser.email }).sort({ createdAt: -1 });
        res.json({ success: true, total: orders.length, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

// ── GET /api/users ────────────────────────────────────────────────────────────
// Admin only — danh sách tất cả user (ẩn password và apiKey)
app.get('/api/users', verifyApiKey, requireAdmin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password -apiKey').sort({ createdAt: -1 });
        res.json({ success: true, total: users.length, data: users });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

// ── POST /api/users/revoke-key ────────────────────────────────────────────────
// Admin only — thu hồi và cấp lại API key của 1 user
app.post('/api/users/revoke-key', verifyApiKey, requireAdmin, async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, error: 'BAD_REQUEST', message: 'Cần cung cấp email.' });

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Không tìm thấy user.' });

        user.apiKey = User.generateApiKey(user.role);
        await user.save();

        res.json({ success: true, message: `Đã cấp API key mới cho ${email}.`, newApiKey: user.apiKey });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});