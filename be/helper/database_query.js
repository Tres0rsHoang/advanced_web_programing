export default async function(request, query) {
    return new Promise(
        (resolve, reject) => {
            const handler = (error, result) => {
                if (error) {
                    reject(error);
                    console.log(`ERROR SQL: ${query}`);
                    throw error;
                }
                resolve(result['recordset']);
            };
            request.query(query, handler);
        }
    );
}