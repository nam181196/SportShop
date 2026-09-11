const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const crypto   = require('crypto');


const userSchema = new mongoose.Schema({
    fullName: {
        type:     String,
        required: true,
        trim:     true
    },
    email: {
        type:      String,
        required:  true,
        unique:    true,
        lowercase: true,
        trim:      true
    },
    password: {
        type:     String,
        required: true
    },
    role: {
        type:    String,
        enum:    ['admin', 'user'],
        default: 'user'
    },
    apiKey: {
        type:   String,
        unique: true,
        sparse: true   // cho phép null nhưng unique khi có giá trị
    },
    createdAt: {
        type:    Date,
        default: Date.now
    }
});

// Hash password trước khi lưu (Mongoose v9 — async hook không dùng next)
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// So sánh password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Generate API key: sk_{role}_{32 hex}
userSchema.statics.generateApiKey = function (role) {
    const prefix = role === 'admin' ? 'sk_admin_' : 'sk_user_';
    return prefix + crypto.randomBytes(16).toString('hex');
};

module.exports = mongoose.model('User', userSchema);
