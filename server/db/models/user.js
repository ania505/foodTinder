const crypto = require('crypto');
const _ = require('lodash');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        // unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        // Making `.password` act like a func hides it when serializing to JSON.
        // This is a hack to get around Sequelize's lack of a "private" option.
        get() {
            return () => this.getDataValue('password')
        }
        //adjust field so that it salts and hashes, never store plain password
    },
    googleId: {
        type: Sequelize.STRING,
    },
    salt: {
        type: Sequelize.STRING
    },
}, {
    hooks: {
        beforeCreate: setSaltAndPassword,
        beforeUpdate: setSaltAndPassword
    }
});

//instance methods
User.prototype.correctPassword = function (candidatePassword) {
    return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
};

User.prototype.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
    // ^^ what does lodash do? what does this.toJSON() do?
};

//class methods
User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
    const hash = crypto.createHash('sha1');
    // ^^ why 'sha1' (sha+one)?
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
    // ^^ why 'hex'?
};

function setSaltAndPassword (user) {
    //needs to be done when creating and changing password
    if (user.changed('password')) {
        user.salt = generateSalt();
        user.password = User.encryptPassword(user.password, user.salt)
        // ^^ uses old password and newly gen. salt to make new salted/hashed password
    }
}


module.exports = User;