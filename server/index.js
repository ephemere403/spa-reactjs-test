import express from "express";
// import {} from "dotenv";

const app = express();

app.get('/', (req,res) => {
    res.send('Hello World! Ephemere.com')
})

let port = process.env.PORT || 3000
app.listen(port, () => console.log('server has been started on ${port}'))