import mongoose from "mongoose";

let Test

try { 
    Test = mongoose.model('Test') 
}
catch {
const TestSchema = new mongoose.Schema({

    id:{
        type: Number
    },

    fullName:{
        type: String,
        required: true,
        max: 32
    },
    
    date: {
        type: Date,
        default: Date.now
    },

})

Test = mongoose.model('Test', TestSchema)
}

export default Test