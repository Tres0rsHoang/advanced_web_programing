import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import express from 'express';
import adminRouter from "./routes/admin.js";
import authenRouter from './routes/authen.js';
import classroomRouter from "./routes/classroom.js";
import gradeRouter from "./routes/grade.js";
import notificationRouter from "./routes/notifications.js";
import profileRouter from "./routes/profile.js";

dotenv.config();

const app = express();

bodyParser.urlencoded({ extended: true });


app.use(bodyParser.json())
   .use(bodyParser.urlencoded())

app.use(cookieParser());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
})

app.use('/notification', notificationRouter);

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

export default app;