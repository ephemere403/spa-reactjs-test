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
    const { year, month } = req.query

    try {
        const matchStage = {}

        if (year) {
            matchStage["date"] = {
                $gte: new Date(Number(year), 0, 1),
                $lte: new Date(Number(year) + 1, 0, 1)
            };
        }

        if (month) {
            matchStage["date"] = {
                $gte: new Date(Number(year), Number(month) - 1, 1),
                $lte: new Date(Number(year), Number(month), 1)
            };
        }

        const pipeline = [];

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage })
        }

        pipeline.push({
            $group: {
                _id: "$city",
                count: { $sum: 1 }
            }
        })

        const cityStats = await Apply.aggregate(pipeline)

        res.json({ cityStats })

    } catch (error) {
        res.status(500).json({ message: 'Не удалось обновить информацию' })
    }
}

export const FetchKPI = async (req,res) => {
    const timeframe = req.query.timeframe

    const today = new Date()
    let startDate, endDate

    if (timeframe === 'day') {
        startDate = new Date(today.setHours(0, 0, 0, 0));
        endDate = new Date(today.setHours(23, 59, 59, 999));
    } else if (timeframe === 'month') {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)
    } else {
        return res.status(400).json({ message: 'Invalid timeframe specified.' })
    }

    try {
        const applies = await Apply.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        })

        const totalApplies = applies.length
        const rejected = applies.filter(apply => apply.status === 'Rejected').length
        const accepted = applies.filter(apply => apply.status === 'Accepted').length

        const kpiPercentage = totalApplies !== 0 ? ((rejected + accepted) / totalApplies) * 100 : 0

        res.json({ kpiPercentage })

    } catch (error) {
        res.status(500).json({ message: 'Не удалось обновить информацию' })
    }
}