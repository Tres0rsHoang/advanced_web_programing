import sql from "mssql";

sql.on('error', err => {
    console.log(`[SQL_SERVER_ERROR] ${err}`);
});

var config = {
    server: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    options: {
      trustServerCertificate: true,
    }
};

export default async function () {
    return new Promise(
        (resolve, reject) => {
            const handler = (error) => {
                if (error) {
                    reject(error);
                    throw error;
                }
                var request = new sql.Request();
                resolve(request);
            }
            sql.connect(config, handler);
        }
    );
}