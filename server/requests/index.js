const axios = require("axios").default;
        
const addCourse = () => {
    axios.post('/register', {
        courseName,
        courseCode,
        creditHour,
        term 
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
}