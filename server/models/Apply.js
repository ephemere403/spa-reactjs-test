import mongoose from "mongoose";
let citiesArr = ['Алматы', 'Астана', 'Актау','Атырау', 'Актобе', 'Караганда', 'Кокшетау', 'Костанай', 'Караганда' ]
let statusArr = ['Unseen', 'Rejected', 'Applied']

let Apply

try { 
    Apply = mongoose.model('Apply') 
}
catch {
const RequestSchema = new mongoose.Schema({


    fullName:{
        type: String,
        required: true,
        max: 32
    },

    phone:{
        type: Number,
        required: true,
        maxLength: 13
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

    status: {
        type: String,
        enum: {
            values: statusArr,
            message: `заявка с некорректным статусом {VALUE}`
        },
        default: "Unseen"
    }

})

Apply = mongoose.model('Apply', RequestSchema)
}

export default Apply