const { sequelize } = require('./sequelize');
const { User } = require('./user');
const { Post } = require('./post');
const { Comment } = require('./comment');

const initModels = () => {
    User.hasMany(Post, { foreignKey: 'authorId' });
    Post.belongsTo(User, { foreignKey: 'authorId' });
    Post.hasMany(Comment, { foreignKey: 'postId' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });
    User.hasMany(Comment, { foreignKey: 'authorId' });
    Comment.belongsTo(User, { foreignKey: 'authorId' });
};

module.exports.sequelize = sequelize;
module.exports.initModels = initModels;
module.exports.User = User;
module.exports.Post = Post;
module.exports.Comment = Comment;
