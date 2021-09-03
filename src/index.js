require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const { sequelize, initModels } = require('./models');

const main = async () => {
    initModels();
    const app = express();
    const router = require('./routes');
    await sequelize.sync();
    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, 'views'));
    app.use('/', router);
    app.listen(process.env.PORT);
};

if (require.main === module) {
    main();
}
