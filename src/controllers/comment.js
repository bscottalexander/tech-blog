const comment = (request, response) => {
    if (!request.session.isLoggedIn) {
        response.redirect('/login');
    }

    if (request.method === 'GET' && request.query?.type === 'new') {
        response.render('newComment', {
            title: 'New Comment',
            post: { id: request.params.postId },
        });
        return;
    }

    response.status(503).send(`METHOD ${request.method} Not Allowed`);
    return;
};

module.exports = comment;
