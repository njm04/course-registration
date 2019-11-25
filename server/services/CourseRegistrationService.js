const fs = require("fs");
const util = require("util");
const path = require("path");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const dataPath = path.join(__dirname, './data');

class CourseRegistrationService {
    constructor(datafile) {
        this.datafile = datafile;
    }

    async registerCourse(courseName, courseCode, creditHour, term, timestamp) {
        const data = await this.getData();
        data.push({courseName, courseCode, creditHour, term, "createdAt": timestamp});
        return writeFile(this.datafile, JSON.stringify(data));
    }

    async getData() {
        const data = await readFile(this.datafile, 'utf8');
        if(!data) return [];
        return JSON.parse(data);
    }
    // checkIfFileExist = () => {
    //     if(fs.existsSync())
    // }
}

module.exports = CourseRegistrationService;
