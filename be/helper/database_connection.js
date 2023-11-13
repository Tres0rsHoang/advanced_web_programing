import mysql from 'mysql';

export default function connectDatabase(serverName, params) {
    return new Promise(
        (resolve, reject) => {
            const connection = mysql.createConnection(params);
            connection.connect(error => {
                if (error) {
                    reject(error);
                    return;
                }
                console.log(`Server ${serverName} connect database ${process.env.DATABASE_HOST} success`);
                resolve(connection);
            })
        }
    );
}