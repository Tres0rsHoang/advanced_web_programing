import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import authenToken from "../helper/authenticate_token.js";
import databaseConnection from '../helper/database_connection.js';
import databaseQuery from '../helper/database_query.js';

const profileRouter = express.Router();
const databaseRequest = await databaseConnection();

profileRouter.get('/', authenToken, async function(req, res, next){
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader.split(' ')[1];

    var refreshTokenId = await jwt.decode(accessToken);
    refreshTokenId = refreshTokenId['refresh_token_id'];

    const userIdSql = `SELECT user_id FROM [refresh_authen] WHERE id = '${refreshTokenId}'`;
    const userId = await databaseQuery(databaseRequest, userIdSql);

    if (userId.length > 0) {
        const sql = `SELECT * FROM [user] WHERE id = '${userId[0]["user_id"]}'`;
        
        const results = await databaseQuery(databaseRequest, sql);

        res.status(200).json(results[0]);
    }
    else {
        res.status(200).json({ "message": "Invalid access token" });
    }
});

profileRouter.patch('/', authenToken, async function(req, res, next) {
    let reqData = req.body;

    if (typeof(req.body) == "string") {
        reqData = JSON.parse(req.body);
    }

    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader.split(' ')[1];

    const refreshTokenId = jwt.decode(accessToken)['refresh_token_id'];
    const userIdSql = `SELECT user_id FROM [refresh_authen] WHERE id = '${refreshTokenId}'`;
    
    const userIdQueryResult = await databaseQuery(databaseRequest, userIdSql);

    const userId = userIdQueryResult[0]['user_id'];

    if (reqData['password']) {
        const hashPassword = await bcrypt.hash(reqData['password'], parseInt(process.env.SALT_ROUNDS)).catch(err => console.error(err.message));
        reqData['password'] = hashPassword;
    }

    const sql = "UPDATE [user]"

    let setSql = "SET";

    const whereSql = `WHERE id = '${userId}'`;

    const params = [userId];

    Object.keys(reqData).forEach(function(key){
        setSql += ` ${key} = '${reqData[key]}',`;
    });

    setSql = setSql.slice(0, -1); 

    const result = await databaseQuery(databaseRequest, `${sql} ${setSql} ${whereSql}`).catch(err => {
        res.status(200).json({"messages" : "Update user profile fail (error query)"});
    });

    res.status(200).json({"messages" : "Update user profile successfully"});
});

export default profileRouter;