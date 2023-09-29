import express from "express";
import mongoose from "mongoose";
import router from "./routes/RequestRoute.js"

const app = express();
app.use(express.json())

// .env config
const port = process.env.PORT || 3000
const MongoURI = process.env.MONGODB_URI || `mongodb://localhost/mydatabase`

// mongo connection
mongoose.connect(MongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req,res) => {
    res.send('Hello World! Ephemere.com')
})

// routing 
app.use('/requests', router)


app.listen(port, () => console.log(`server has been started on ${port}`))