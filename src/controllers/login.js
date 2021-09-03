const { User } = require('../models');
const { comparePasswords } = require('../utils');

const login = async (request, response) => {
    if (request.session.isLoggedIn) {
        response.redirect('/');
        return;
    }

    if (request.method === 'GET') {
        response.render('login', { title: 'Login' });
        return;
    }

    if (request.method === 'POST') {
        const user = await User.findOne({
            where: {
                username: request.body.username,
            },
        });
        if (!user) {
            response.redirect('/login');
            return;
        }

        if (!comparePasswords(request.body.password, user.passwordDigest)) {
            response.redirect('/login');
            return;
        }

        request.session.isLoggedIn = true;
        request.session.username = request.body.username;
        request.session.userId = user.id;
        response.redirect('/');
        return;
    }

    response.status(503).send(`METHOD ${request.method} Not Allowed`);
    return;
};

module.exports = login;
