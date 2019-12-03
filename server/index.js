const express = require("express");
const bodyParser = require("body-parser");
// const createError = require('http-errors');
const path = require("path");
var exphbs  = require('express-handlebars');
const configs = require("./config");
const CourseRegistrationService = require("./services/CourseRegistrationService");
const app = express();

const config = configs.data;
const courseRegistrationService = new CourseRegistrationService(config.courses);
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        toDate: (date) => new Date(date).toLocaleString()
    }
}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'handlebars');

const routes = require("./routes");

app.use(express.static('public'));

// app.use(express.static(__dirname + 'node_modules/bootstrap/dist/css/bootstrap.min.css'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/favicon.ico', (req, res, next) => {
    return res.sendStatus(204);
});

// app.use(async(req, res, next) => {
//     try {
//         const courses = await courseRegistrationService.getData();
//         return courses;
//     } catch (err) {
//         return next(err);
//     }
// })

app.use('/', routes({
    courseRegistrationService
}));

// app.use((req, res, next) => {
//     return next(createError(404, 'Page not found'));
// });

// renders error page
app.use((req, res, next) => {
    return res.render('error');
});

app.listen(3006, () => {
    console.log("Listening to port 3006");
});

module.exports = app;


