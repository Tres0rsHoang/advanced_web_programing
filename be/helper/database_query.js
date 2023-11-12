export default async function(conn, query, params) {
    return new Promise(
        (resolve, reject) => {
            const handler = (error, result) => {
                if (error) {
                    reject(error);
                    throw error;
                }
                resolve(result);
            }
            conn.query(query, params, handler);
        }
    );
}