import jwt from 'jsonwebtoken';

export default function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.status(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, data) => {
        if (err) {
            res.status(403).json({"Error": err});
        }
        next();
    })
}