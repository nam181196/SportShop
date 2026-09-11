/**
 * Auth Middleware — SportShop
 * Cung cấp 3 middleware kiểm tra quyền truy cập:
 *   isLoggedIn  — yêu cầu đã đăng nhập
 *   isAdmin     — yêu cầu role = 'admin'
 *   isUser      — yêu cầu role = 'user' hoặc 'admin'
 */

// Yêu cầu đã đăng nhập; nếu chưa → redirect /login
function isLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    // Lưu lại URL muốn truy cập để redirect sau khi login
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
}

// Yêu cầu role = 'admin'
function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    // Đã đăng nhập nhưng không đủ quyền → 403
    if (req.session && req.session.user) {
        return res.status(403).render('auth/403', {
            user: req.session.user
        });
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
}

// Yêu cầu role = 'user' hoặc 'admin'
function isUser(req, res, next) {
    if (req.session && req.session.user &&
        (req.session.user.role === 'user' || req.session.user.role === 'admin')) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
}

module.exports = { isLoggedIn, isAdmin, isUser };
