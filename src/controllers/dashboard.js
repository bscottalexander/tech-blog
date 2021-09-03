const { Post, User } = require('../models');

const dashboard = async (request, response) => {
    if (!request.session.isLoggedIn) {
        response.redirect('/login');
    }

    if (request.method === 'GET') {
        const posts = (
            await Post.findAll({
                where: {
                    authorId: request.session.userId,
                },
                include: [{ model: User, as: 'user' }],
            })
        ).map((post) => ({
            name: post.name,
            content: post.content,
            authorName: post.user.username,
            url: `/posts/${post.id}`,
        }));
        response.render('dashboard', { title: 'Dashboard Page', posts });
        return;
    }

    response.status(503).send(`METHOD ${request.method} Not Allowed`);
    return;
};

module.exports = dashboard;
