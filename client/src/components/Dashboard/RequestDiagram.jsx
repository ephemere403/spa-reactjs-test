import React, {useState, useEffect, useMemo} from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer} from 'recharts'
import axios from 'axios'
import CustomSkeleton from "../Skeleton"
import {getRandomColor} from "../../utilities/RandomColors"
import CustomLegend from "../CustomLegend";
import { DropdownButton, Dropdown} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const MonthlyStatsChart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [mode, setMode] = useState('month')
        const transformData = (stats) => {
        const dataMap = {}

        stats.forEach(stat => {
            if (!dataMap[stat._id.month]) {
                dataMap[stat._id.month] = {month: stat._id.month}
            }
            dataMap[stat._id.month][stat._id.status] = stat.count;
        })

        return Object.values(dataMap)
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/fetchApplies/${mode}`,{
                    params:{
                        month: new Date().getMonth()+1,
                        year: new Date().getFullYear()
                    }
                })
                const transformedData = transformData(response.data.Stats)
                setData(transformedData)
                setLoading(false)
            } catch (error) {
                console.error(`Error fetching ${mode} stats:`, error)
                setError(error.response.data.message)
            }
        }

        fetchData()
    }, [mode])

    const statusColors = useMemo(() => ({
        'Unseen': getRandomColor(),
        'Rejected': getRandomColor(),
        'Applied': getRandomColor(),
    }), [])

    const computeTotals = (data) => {
        const totals = {
            'Unseen': 0,
            'Rejected': 0,
            'Applied': 0
        }
        data.forEach(item => {
            Object.keys(item).forEach(key => {
                if (key !== "month") {
                    if (!totals[key]) {
                        totals[key] = 0;
                    }
                    totals[key] += item[key]
                }
            })
        })
        return totals
    }

    const totals = computeTotals(data)

    return (
        <>
            {loading ? (
                <CustomSkeleton errorMessage={error}/>
            ) : (
                <>
                    <Row className="align-items-start pb-3">
                        <Col className="col-sm-6"> <h6> Статистика Заявок </h6> </Col>
                        <Col className="col-sm-6">
                            <DropdownButton className="float-start"
                                title={mode === 'month' ? 'за месяц' : 'за год'}
                                onSelect={(selectedMode) => setMode(selectedMode)}
                            >
                                <Dropdown.Item eventKey="month">за месяц</Dropdown.Item>
                                <Dropdown.Item eventKey="year">за год</Dropdown.Item>
                            </DropdownButton>
                        </Col>


                    </Row>
                    <ResponsiveContainer style={{maxHeight: "300px"}}>
                        <BarChart width={600} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="month"/>
                            <YAxis allowDecimals={false}/>
                            <Bar dataKey="Unseen" fill={statusColors['Unseen']}/>
                            <Bar dataKey="Rejected" fill={statusColors['Rejected']}/>
                            <Bar dataKey="Applied" fill={statusColors['Applied']}/>
                            <Legend content={<CustomLegend totals={totals}/>}/>


                        </BarChart>
                    </ResponsiveContainer>

                </>

            )}


        </>

    )
}

export default MonthlyStatsChart
