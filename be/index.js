import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import adminRouter from "./routes/admin.js";
import authenRouter from './routes/authen.js';
import classroomRouter from "./routes/classroom.js";
import gradeRouter from "./routes/grade.js";
import profileRouter from "./routes/profile.js";

dotenv.config();

const app = express();

bodyParser.urlencoded({ extended: true });


app.use(bodyParser.json())
   .use(bodyParser.urlencoded())

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.use(cors());

app.use('/auth', authenRouter);

app.use('/profile', profileRouter);

app.use('/classroom', classroomRouter);

app.use('/classroom/grade', gradeRouter);

app.use('/admin', adminRouter);

app.get('/', function (req, res, next) {
    res.send("Server is running...");
});

app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

app.set('port', process.env.PORT || 9000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

export default app;