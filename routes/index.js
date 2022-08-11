const express = require('express');

const furnitureRoute = require('./furniture.route');
const categoryRoute = require('./category.route');
const userRoute = require('./user.route');

const appRouter = (app) => {

    const router = express.Router();

    app.use('/api', router);
    router.use('/furniture', furnitureRoute);
    router.use('/category', categoryRoute);
    router.use('/user', userRoute);

}

module.exports = appRouter;