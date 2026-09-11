/**
 * API Key Middleware — SportShop
 * Dùng cho các route /api/* thay thế session-based auth.
 *
 * Client truyền key qua:
 *   Header:      X-API-Key: sk_admin_xxx
 *   Query param: ?api_key=sk_admin_xxx   (fallback tiện cho test)
 */

const User = require('../models/User');

// ── Lấy key từ header hoặc query ─────────────────────────────────────────────
function extractApiKey(req) {
    return req.headers['x-api-key'] || req.query.api_key || null;
}

// ── Verify key, gắn req.apiUser nếu hợp lệ ───────────────────────────────────
async function verifyApiKey(req, res, next) {
    const key = extractApiKey(req);

    if (!key) {
        return res.status(401).json({
            success: false,
            error:   'UNAUTHORIZED',
            message: 'API key bắt buộc. Truyền qua header X-API-Key hoặc query ?api_key='
        });
    }

    try {
        const user = await User.findOne({ apiKey: key }).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                error:   'INVALID_API_KEY',
                message: 'API key không hợp lệ hoặc đã bị thu hồi.'
            });
        }

        req.apiUser = user;  // gắn user vào request để dùng ở route handler
        next();
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
}

// ── Yêu cầu role = 'admin' ────────────────────────────────────────────────────
function requireAdmin(req, res, next) {
    if (req.apiUser && req.apiUser.role === 'admin') {
        return next();
    }
    res.status(403).json({
        success: false,
        error:   'FORBIDDEN',
        message: `Chức năng này yêu cầu quyền admin. Tài khoản hiện tại: role="${req.apiUser?.role}".`
    });
}

// ── Yêu cầu role = 'user' hoặc 'admin' ───────────────────────────────────────
function requireUser(req, res, next) {
    if (req.apiUser && (req.apiUser.role === 'user' || req.apiUser.role === 'admin')) {
        return next();
    }
    res.status(403).json({
        success: false,
        error:   'FORBIDDEN',
        message: 'Bạn không có quyền truy cập tài nguyên này.'
    });
}

module.exports = { verifyApiKey, requireAdmin, requireUser };
