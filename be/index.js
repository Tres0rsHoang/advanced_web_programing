import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import authenRouter from './routes/authen.js';
import classroomRouter from "./routes/classroom.js";
import gradeRouter from "./routes/grade.js";
import profileRouter from "./routes/profile.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());  

app.use('/auth', authenRouter);

app.use('/profile', profileRouter);

app.use('/classroom', classroomRouter);

app.use('/classroom/grade', gradeRouter);

export default app;