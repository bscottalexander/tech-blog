const bcrypt = require('bcrypt');

const hashPassword = (password, rounds) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, rounds, (err, hash) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(hash);
        });
    });
};

const comparePasswords = (plainText, hashed) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashPassword, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

module.exports.hashPassword = hashPassword;
module.exports.comparePasswords = comparePasswords;
