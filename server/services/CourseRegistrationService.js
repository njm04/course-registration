const fs = require("fs");
const util = require("util");
const path = require("path");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);
const dataPath = path.join(__dirname, './data/courses.json');

class CourseRegistrationService {
    constructor(datafile) {
        this.datafile = datafile;
    }

    async registerCourse(courseName, courseCode, creditHour, term, timestamp) {
        const data = await this.getData();
        data.push({courseName, courseCode, creditHour, term, "createdAt": timestamp});
        if(!fs.existsSync(this.datafile)) return writeFile(this.datafile, JSON.stringify(data));
        console.log('File already exists')
        return writeFile(this.datafile, JSON.stringify(data));
    }

    async getData() {
        if(fs.existsSync(this.datafile)) {
            const data = await readFile(this.datafile, 'utf8');
            if(!data) return [];
            return JSON.parse(data);
        } else {
            return [];
        }
        
    }
}

module.exports = CourseRegistrationService;
