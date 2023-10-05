import axios from 'axios'

export const FetchCurrency = async(req,res) => {

    try{
        const response = await axios.get(`http://api.exchangeratesapi.io/v1/${req.params.date}`, {
            params: {
                symbols: 'KZT',
                access_key: `48fb275710cd425d0c78ed9c2f633172`
            }
        })
        res.json(response.data)

    } catch(error){
        console.error("Error fetching data: ", error)
        res.status(500).json({
            message: 'Не удалось обновить информацию'
        })
    }
}