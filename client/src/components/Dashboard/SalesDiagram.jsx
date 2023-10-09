import React, {useEffect, useState} from 'react'
import axios from "axios";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend} from 'recharts'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import CustomSkeleton from "../Skeleton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomLegend from "../CustomLegend";

const SalesDiagram = () => {
    const [data, setData] = useState([])
    const [mode, setMode] = useState('month')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        setLoading(true)
        const fetchData = async () => {
            try {
                const currentDate = new Date();
                const params = {
                    year: currentDate.getFullYear()
                };

                if (mode === 'month') {
                    params.month = currentDate.getMonth() + 1
                }

                const response = await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/fetchApplies/city`, { params })

                setData(response.data.cityStats)
                setLoading(false)
            } catch (error) {
                console.error(`Error fetching ${mode} stats:`, error)
                setError(error.response.data.message)
            }
        }

        fetchData()
    }, [mode])

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
                    <Row className="align-items-center pb-3">
                        <Col className="col-sm-6 col-lg-8"><h6>Продажи по Казахстану</h6></Col>
                        <Col className="col-sm-6 col-lg-2">
                            <DropdownButton
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
                            <XAxis dataKey="_id" />
                            <YAxis allowDecimals={false} />
                            <Bar dataKey="count" fill="#8884d8"/>

                            <Legend content={<CustomLegend totals={totals}/>}/>

                        </BarChart>
                    </ResponsiveContainer>

                </>




            )}
        </>
    )
}

export default SalesDiagram