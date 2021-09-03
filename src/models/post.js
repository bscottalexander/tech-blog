const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Post extends Model {}
Post.init(
    {
        name: DataTypes.STRING,
        content: DataTypes.STRING,
        date: DataTypes.DATE,
    },
    { sequelize, modelName: 'post', timestamps: false }
);

module.exports.Post = Post;
