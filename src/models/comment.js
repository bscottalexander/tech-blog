const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Comment extends Model {}
Comment.init(
    {
        content: DataTypes.STRING,
        date: DataTypes.DATE,
    },
    { sequelize, modelName: 'comment', timestamps: false }
);

module.exports.Comment = Comment;
