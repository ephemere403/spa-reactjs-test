import express from "express";
import mongoose from "mongoose";
import { CreateApply, GetAllApplies, RemoveApply, UpdateApply } from "./routes/RequestRoute.js"
import { FetchCurrency } from "./routes/ApiRoute.js";
import {FetchAppliesMonth, FetchAppliesCity, FetchAppliesYear, FetchKPI} from "./routes/FetchRoute.js";
import cors from "cors";
import HandleValidationErrors from "./utils/HandleValidationErrors.js";



const app = express();
app.use(express.json())

const CorsOptions = {
  optionSuccessStatus: 200}

app.use(cors(CorsOptions))

// .env config
const port = process.env.PORT || 5000
const MongoURI = process.env.MONGODB_URI || `mongodb://127.0.0.1/dashboardAlina`

// mongo connection
mongoose.connect(MongoURI, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB connected on ${port}`))
  .catch(err => console.log('MongoDB crush - ' + err));


  // routing 
app.get('/', (req,res) => {
    res.send('Hello World! Ephemere.com')
})

app.get('/requests', GetAllApplies)
app.post('/requests', HandleValidationErrors, CreateApply)
app.patch('/requests', HandleValidationErrors, UpdateApply)
app.delete('/requests', RemoveApply)
app.get('/fetchCurrency/:date', FetchCurrency)
app.get('/fetchApplies/month', FetchAppliesMonth)
app.get('/fetchApplies/year', FetchAppliesYear)
app.get('/fetchApplies/city', FetchAppliesCity)
app.get('/fetchApplies/kpi', FetchKPI)

app.listen(port, () => console.log(`server has been started on ${port}`))