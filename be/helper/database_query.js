export default async function(connection, query, params) {
    return new Promise(
        (resolve, reject) => {
            const handler = (error, result) => {
                if (error) {
                    reject(error);
                    throw error;
                }
                resolve(result);
            }
            connection.query(query, params, handler);
        }
    );
}