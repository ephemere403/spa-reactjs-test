import Apply from '../models/Apply.js';

export const CreateApply = async(req,res) => {
    try{
        const filledApply = new Apply({
            fullname : req.body.fullname,
            phone : req.body.phone,
            typeRequest : req.body.typeRequest,
            amountRequest : req.body.amountRequest,
            city : req.body.city,
            phoneCall : req.body.phoneCall,
            date : req.body.date

        })

        await filledApply.save

    } catch(error){
        res.status(402).json({
            message: 'Ошибка на сервере'
        })
        console.log(error)
    }
}

export const GetAllApplies = async(req,res) => {
    try{
        const Applies = await Apply.find()

        res.json(Applies)

    } catch(error) {
        res.status(402).json({
            message: 'Не удалось получить статьи'
        })

    }
}