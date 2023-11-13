import express from 'express';
 
const app = express();

const port =  9000;

app.get('/', (req, res) => {
    res.json({"message" : "sucess"});
});

app.listen(port, () => {console.log("Server is running at " + port)});