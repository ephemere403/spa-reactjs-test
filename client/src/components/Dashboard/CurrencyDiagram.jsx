import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
import CustomSkeleton from "../Skeleton";
import Row from "react-bootstrap/Row";

const CurrencyDiagram = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [daysScope, setDaysScope] = useState(7) // default to 7 days
    const API_Access_Key = '48fb275710cd425d0c78ed9c2f633172'
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const endDate = new Date()
                const startDate = new Date()
                startDate.setDate(endDate.getDate() - daysScope + 1) // +1 to include the end date

                const dateArray = [];
                for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                    dateArray.push(new Date(d))
                }
                const dataPromises = dateArray.map(async date => {
                    const dateString = date.toISOString().split('T')[0] // format as YYYY-MM-DD
                    const response = await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/fetchCurrency/${dateString}`, {
                        params: {
                            symbols: 'KZT',
                            access_key: API_Access_Key,
                        }
                    })
                    return {
                        date: dateString,
                        rate: response.data.rates.KZT,
                    }
                })

                const fetchedData = await Promise.all(dataPromises)
                setData(fetchedData)

                setLoading(false)
            } catch (error) {
                console.error('Error:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                }
                setError(error.response ? error.response.data.message : 'Unknown error');
            }

        }
        fetchData()
    }, [daysScope])

    return (
            <Row>
                {loading ? (
                    <CustomSkeleton errorMessage={error}/>
                    ) : (
                        <ResponsiveContainer >
                            <LineChart data={data}  width="100%" height={400} margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}>

                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Line type="monotone" dataKey="rate" stroke="#8884d8" />
                                <Tooltip />
                            </LineChart>
                            <input
                                type="range"
                                min="3"
                                max="30"
                                value={daysScope}
                                onChange={(e) => setDaysScope(Number(e.target.value))}
                            />
                            <div>{daysScope} days</div>
                        </ResponsiveContainer>

            )}
            </Row>

    )
}

export default CurrencyDiagram;
