const { Post, User } = require('../models');

const post = async (request, response) => {
    if (!request.session.isLoggedIn) {
        response.redirect('/login');
    }

    if (request.method === 'GET' && request.query?.type === 'new') {
        response.render('newPost', { title: 'New Post' });
        return;
    }

    if (
        request.method === 'GET' &&
        request.query?.type === 'update' &&
        request.query?.id
    ) {
        const post = await Post.findOne({
            where: {
                id: request.query?.id,
            },
        });
        if (post) {
            response.render('newPost', {
                title: 'Update Post',
                post: {
                    id: post.id,
                    title: post.name,
                    content: post.content,
                },
            });
            return;
        }
    }

    if (
        request.method === 'GET' &&
        request.query?.type === 'delete' &&
        request.query?.id
    ) {
        await Post.destroy({
            where: {
                id: request.query?.id,
            },
        });
        response.redirect('/');
        return;
    }

    if (request.method === 'POST' && request.body.id === '') {
        await Post.create({
            name: request.body.title,
            content: request.body.content,
            date: new Date(),
            authorId: request.session.userId,
        });
        response.redirect('/dashboard');
        return;
    }

    if (request.method === 'POST' && request.body.id !== '') {
        const post = await Post.findOne({
            where: {
                id: request.body.id,
            },
        });

        if (post) {
            await post.update({
                name: request.body.title,
                content: request.body.content,
                date: new Date(),
                authorId: request.session.userId,
            });
            response.redirect('/dashboard');
            return;
        }
    }

    if (request.method === 'GET' && request.params.id) {
        const post = await Post.findOne({
            where: {
                id: request.params.id,
            },
            include: [{ model: User, as: 'user' }],
        });

        if (post) {
            response.render('post', {
                title: 'Post',
                post: {
                    id: post.id,
                    name: post.name,
                    content: post.content,
                    authorName: post.user.username,
                    editURL: `/posts?type=update&id=${post.id}`,
                    deleteURL: `/posts?type=delete&id=${post.id}`,
                },
            });
            return;
        }
    }

    response.status(503).send(`METHOD ${request.method} Not Allowed`);
    return;
};

module.exports = post;
