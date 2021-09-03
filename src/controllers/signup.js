const { User } = require('../models');
const { hashPassword } = require('../utils');

const signup = async (request, response) => {
    if (request.session.isLoggedIn) {
        response.redirect('/');
        return;
    }
    if (request.method === 'GET') {
        response.render('signup', { title: 'Sign Up' });
        return;
    }

    if (request.method === 'POST') {
        const passwordDigest = await hashPassword(request.body.password, 10);
        await User.create({
            username: request.body.username,
            passwordDigest,
        });
        response.redirect('/login');
        return;
    }

    response.status(503).send(`METHOD ${request.method} Not Allowed`);
    return;
};

module.exports = signup;
