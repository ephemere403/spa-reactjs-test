import Apply from '../models/Apply.js';
import express from 'express';

const router = express.Router();

router.get('/my', async(req,res) => {
    try{
        const Requests = await Apply.find

    } catch (error){
        res.status(500).json({
            message: 'Ошибка на сервере'
        })
    }
})

export default router