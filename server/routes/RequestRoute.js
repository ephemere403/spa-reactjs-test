import Apply from '../models/Apply.js';
import mongoose from 'mongoose';

export const CreateApply = async(req,res) => {
    
    try{
        const filledApply = new Apply({
            fullName : req.body.fullName,
            phone : req.body.phone,
            typeRequest : req.body.typeRequest,
            amountRequest : req.body.amountRequest,
            city : req.body.city,
            phoneCall : req.body.phoneCall,
            date : req.body.date,
            status: req.body.status,
            emailMe: req.body.status,
            messageMe: req.body.status

        })

        await filledApply.save()
        res.status(200).json({
            message: 'Успешно создалась заявка'
        })


    } catch(error){
        res.status(406).json({
            message: 'Не удалось создать заявку'
        })
        console.log(error)
    }
}

export const RemoveApply = async(req,res) => {
    const ApplyId = req.query.id

    if (!mongoose.Types.ObjectId.isValid(ApplyId)) {
        return res.status(400).send('Не существует такой заявки');
    }

    try {

       await Apply.findOneAndDelete(
        {
            _id : ApplyId
        }
        )

        res.status(200).json({
            message : 'Успешно удалена заявка'
        })

    } catch(error){
        res.status(500).json({
            message: 'Не удалось удалить заявку'
        })
        console.log(error)
    }
}

export const UpdateApply = async(req, res) => {
    const ApplyId = req.query.id;

    if (!mongoose.Types.ObjectId.isValid(ApplyId)) {
        return res.status(400).send('Не существует такой заявки');
    }

    try {
        // Only update the 'status' field
        await Apply.findOneAndUpdate(
            { _id: ApplyId },
            { status: req.body.status },
            { new: true }
        );

        res.status(200).json({
            message: 'Успешно обновлена заявка'
        });

    } catch(error) {
        res.status(500).json({
            message: 'Не удалось обновить заявку'
        });
        console.log(error);
    }
}


export const GetAllApplies = async (req, res) => {
    try {
        let { page, limit } = req.query
        page = parseInt(page, 10) || 1
        limit = parseInt(limit, 10) || 10 // default is 1o applies per page
        const skip = (page - 1) * limit;

        let query = {}
        if (['Applied', 'Unseen', 'Rejected'].includes(req.query.status)) {
            query.status = req.query.status
        }
        
        const Applies = await Apply.find(query).skip(skip).limit(limit)
        res.json(Applies)
        
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось получить статьи'
        });
        console.error(error);
    }
}
