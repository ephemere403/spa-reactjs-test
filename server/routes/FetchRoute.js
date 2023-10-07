import Apply from "../models/Apply.js";

const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
]

export const FetchAppliesMonth = async(req,res) => {
    const { month, year } = req.query

    try {
        const Stats = await Apply.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$date" }, parseInt(month)] },
                            { $eq: [{ $year: "$date" }, parseInt(year)] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" }, status: "$status" },
                    count: { $sum: 1 }
                }
            }
        ])

        Stats.forEach(stat => {
            stat._id.month = monthNames[stat._id.month - 1]
        })

        res.json({ Stats })

    } catch (error) {
        res.status(500).json({ message: 'Не удалось обновить информацию' })
    }
}

export const FetchAppliesYear = async (req, res) => {
    const { year } = req.query

    try {
        const Stats = await Apply.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $year: "$date" }, parseInt(year)]
                    }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" }, status: "$status" },
                    count: { $sum: 1 }
                }
            }
        ])

        Stats.forEach(stat => {
            stat._id.month = monthNames[stat._id.month - 1]
        })

        res.json({ Stats })

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