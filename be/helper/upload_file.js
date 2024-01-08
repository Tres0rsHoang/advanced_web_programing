export default async function(filePath, fileData) {
    return new Promise(
        (resolve, reject) => {
            fileData.mv(filePath, (err) => {
                if (err) {
                    reject(error);
                    console.log(`ERROR FILE UPLOAD: ${fileData.name}`);
                    return;
                }
                resolve(filePath);  
            });
            
        }
    );
}