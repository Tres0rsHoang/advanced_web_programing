export default async function(request, query) {
    return new Promise(
        (resolve, reject) => {
            const handler = (error, result) => {
                if (error) {
                    reject(error);
                    throw error;
                }
                resolve(result['recordset']);
            };
            request.query(query, handler);
        }
    );
}