import Apply from "../models/Apply.js";

export const FetchAppliesMonth = async(req,res) => {

    try {

        const monthlyStats = await Apply.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$date" }, status: "$status" },
                    count: { $sum: 1 }
                }
            }
        ])

        res.json({ monthlyStats })

    } catch (error) {
        res.status(500).json({ message: 'Не удалось обновить информацию' })
    }
}

export const FetchAppliesCity = async(req,res) => {

    try {
        const cityStats = await Apply.aggregate([
            {
                $group: {
                    _id: "$city",
                    count: { $sum: 1 }
                }
            }
        ])

        res.json({ cityStats })

    } catch (error) {
        res.status(500).json({ message: 'Не удалось обновить информацию' })
    }
}