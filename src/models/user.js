const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class User extends Model {}
User.init(
    {
        username: DataTypes.STRING,
        passwordDigest: DataTypes.STRING,
    },
    { sequelize, modelName: 'user', timestamps: false }
);

module.exports.User = User;
