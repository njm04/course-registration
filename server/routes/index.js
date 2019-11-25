const express = require("express");
const router = express.Router();

const registrationRoute = require("./registration");
// const test = require("./../")

module.exports = (param) => {
    const { courseRegistrationService } = param;
    router.get('/', async (req, res, next) => {
        const courseList = await courseRegistrationService.getData();
        return res.render('courses', {
            courseList
        });
    })

    router.use('/registration', registrationRoute(param));

    return router;
}