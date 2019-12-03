const express = require("express");
const router = express.Router();

module.exports = (param) => {
    const { courseRegistrationService } = param;

    router.post('/', async(req, res, next) => {
        try {
            const courseName = req.body.courseName;
            const courseCode = req.body.courseCode;
            const creditHour = req.body.creditHour;
            const term = req.body.term;
            const timestamp = Date.now();
            const courseList = await courseRegistrationService.getData();
            console.log(courseName, courseCode, creditHour, term)
            if(!courseName || !courseCode || !creditHour || !term) {
                return res.render('courses', {
                    page: 'Courses',
                    error: true,
                    courseName,
                    courseCode,
                    creditHour,
                    term,
                    courseList
                });
            } else {
                await courseRegistrationService.registerCourse(courseName, courseCode, creditHour, term, timestamp);
                // Updates the list when new data is added
                // let courseList = await courseRegistrationService.getData();
                res.redirect('/');
            }
        } catch(err) {
            return next(err);
        }
    });

    router.get('/', async(req, res, next) => {
        try {
            const courseList = await courseRegistrationService.getData();
            // return res.send(courseList)
            return res.render('courses', {
                page: 'courses',
                courseList
            })
        } catch(err) {
            return next(err);
        }
    });

    return router;
}