export default async function(request, query) {
    return new Promise(
        (resolve, reject) => {
            const handler = (error, result) => {
                if (error) {
                    reject(error);
                    console.log(`ERROR SQL: ${query}`);
                    return;
                }
                if (result['recordset']) {
                    resolve(result['recordset']);
                    return;
                }
                resolve(result['rowsAffected'][0]);  
            };
            request.query(query, handler);
        }
    );
}