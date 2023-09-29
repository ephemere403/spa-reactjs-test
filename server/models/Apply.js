import mongoose from "mongoose";
let citiesArr = ['Алматы', 'Астана', 'Актау','Атырау', 'Актобе', 'Караганда', 'Кокшетау', 'Костанай', 'Караганда' ]

let Apply

try { 
    Apply = mongoose.model('Apply') 
}
catch {
const RequestSchema = new mongoose.Schema({

    id:{
        type: Number
    },

    fullName:{
        type: String,
        required: true,
        max: 32
    },

    phone:{
        type: Number,
        required: true,
        max: 13
    },

    typeRequest:{
        type: String,
        required: true
    },

    amountRequest:{
        type: Number,
        default: 1
    },

    city:{
        type: String,
        required: true,
        enum: {
            values: citiesArr,
            message: `г. {VALUE} не поддерживается`
        }
    },

    phoneCall:{
        type: Boolean,
        default: true
    },
    
    date: {
        type: Date,
        default: Date.now
    },

})

Apply = mongoose.model('Apply', RequestSchema)
}

export default Apply