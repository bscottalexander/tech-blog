const { Post, User } = require('../models');

const index = async (request, response) => {
    if (request.method === 'GET') {
        const posts = (
            await Post.findAll({
                include: [{ model: User, as: 'user' }],
            })
        ).map((post) => ({
            name: post.name,
            content: post.content,
            authorName: post.user.username,
            url: `/posts/${post.id}`,
        }));
        response.render('home', { title: 'Home Page', posts });
        return;
    }

    response.status(503).send(`METHOD ${request.method} Not Allowed`);
    return;
};

module.exports = index;
