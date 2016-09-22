const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const { STATUS, MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE } = require('../constants/user');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String },
    username: { type: String, required: true, lowercase: true, index: { unique: true } },
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    lastLogin: Date,
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
    status: { type: String, enum: Object.values(STATUS), required: true },
});

UserSchema.pre('save', function preSave(next) {
    const self = this;

    // hash the password only if the password has been changed or user is new
    if (!self.isModified('password')) {
        return next();
    }

    if (self.password.length < MINIMUM_PASSWORD_LENGTH) {
        const error = Error(MINIMUM_PASSWORD_MESSAGE);
        return next(error);
    }

    self.salt = encryption.createSalt();
    self.password = encryption.hashPassword(self.salt, self.password);

    return next();
});

UserSchema.methods.comparePassword = function comparePassword(password) {
    return encryption.hashPassword(this.salt, password) === this.password;
};

module.exports = mongoose.model('User', UserSchema);
