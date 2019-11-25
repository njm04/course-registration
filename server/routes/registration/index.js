const express = require("express");
const router = express.Router();

module.exports = (param) => {
    const { courseRegistrationService } = param;

    router.post('/', async(req, res, next) => {
        try {
            const courseName = req.body.courseName.trim();
            const courseCode = req.body.courseCode.trim();
            const creditHour = req.body.creditHour.trim();
            const term = req.body.term.trim();
            const timestamp = Date.now();
            const courseList = await courseRegistrationService.getData();
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
                const courseList = await courseRegistrationService.getData();
                return res.render('courses', {
                    page: 'Courses',
                    success: true,
                    courseList
                });
            }
        } catch(err) {
            return next(err);
        }
    });

    router.get('/', async(req, res, next) => {
        try {
            const courseList = await courseRegistrationService.getData();
            console.log("in get: ", courseList)
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