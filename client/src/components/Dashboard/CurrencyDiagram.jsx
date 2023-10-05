import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import CustomSkeleton from "../Skeleton";

const CurrencyDiagram = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [daysScope, setDaysScope] = useState(7) // default to 7 days
    const API_Access_Key = '48fb275710cd425d0c78ed9c2f633172'

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
                    const dateString = date.toISOString().split('T')[0]; // format as YYYY-MM-DD
                    const response = await axios.get(`http://localhost:3000/fetchCurrency/${dateString}`, {
                        params: {
                            symbols: 'KZT',
                            // Add your API key here
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
                console.error("Error fetching data: ", error);
                // Handle error accordingly
            }
        }
        fetchData()
    }, [daysScope])

    return (
            <>
                {loading ? (
                    <CustomSkeleton/>
                    ) : (
                        <ResponsiveContainer>
                            <LineChart data={data}  width="100%" height={300} margin={{
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
            </>

    )
}

export default CurrencyDiagram;
