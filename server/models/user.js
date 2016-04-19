const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encryption = require('../utilities/encryption');

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    lastLogin: Date,
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
});

UserSchema.pre('save', function preSave(next) {
    const self = this;

    // hash the password only if the password has been changed or user is new
    if (!self.isModified('password')) {
        return next();
    }

    console.log(self.salt);
    self.salt = encryption.createSalt();
    console.log(self.salt);

    console.log(self.password);
    self.password = encryption.hashPassword(self.salt, self.password);
    console.log(self.password);

    return next();
});

UserSchema.methods.comparePassword = function comparePassword(password) {
    return encryption.hashPassword(this.salt, password) === this.password;
};

module.exports = mongoose.model('User', UserSchema);
