import express from "express";
import mongoose from "mongoose";
import { CreateApply, GetAllApplies } from "./routes/RequestRoute.js"
import cors from "cors";


const app = express();
app.use(express.json())

const CorsOptions = {
  optionSuccessStatus: 200}

app.use(cors(CorsOptions))

// .env config
const port = process.env.PORT || 3000
const MongoURI = process.env.MONGODB_URI || `mongodb://localhost/my-database`

// mongo connection
mongoose.connect(MongoURI, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB connected on ${port}`))
  .catch(err => console.log('MongoDB crush - ' + err));


  // routing 
app.get('/', (req,res) => {
    res.send('Hello World! Ephemere.com')
})

app.get('/requests', GetAllApplies)
app.post('/requests', CreateApply)


app.listen(port, () => console.log(`server has been started on ${port}`))