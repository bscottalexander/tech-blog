const express = require('express');
const { sequelize } = require('./models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const loginController = require('./controllers/login');
const signupController = require('./controllers/signup');
const logoutController = require('./controllers/logout');
const indexController = require('./controllers/index');
const dashboardController = require('./controllers/dashboard');
const postController = require('./controllers/post');
const commentsController = require('./controllers/comment');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: new SequelizeStore({
            db: sequelize,
        }),

        resave: false,
        saveUninitialized: true,
        proxy: true,
    })
);
router.all('/login', loginController);
router.all('/signup', signupController);
router.all('/logout', logoutController);
router.all('/', indexController);
router.all('/dashboard', dashboardController);
router.all('/posts/:id?', postController);
router.all('/posts/:postId/comments/:id?', commentsController);
module.exports = router;
