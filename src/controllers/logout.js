const onLogout = (request) => {
    return new Promise((resolve, reject) => {
        request.session.destroy((err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

const logout = async (request, response) => {
    if (!request.session.isLoggedIn) {
        response.redirect('/login');
        return;
    }

    if (request.method === 'GET') {
        await onLogout(request);
        response.redirect('/login');
        return;
    }

    response.status(503).send(`METHOD ${request.method} Not Allowed`);
    return;
};

module.exports = logout;
