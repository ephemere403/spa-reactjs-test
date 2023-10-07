import React, {useEffect, useState} from 'react'
import axios from "axios";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts'
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
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/fetchApplies/city`)

                setData(response.data.cityStats)
                setLoading(false)
                console.log(data)
            } catch (error) {
                console.error(`Error fetching ${mode} stats:`, error)
                setError(error.response.data.message)
            }
        }

        fetchData()
    }, [mode])

    return (
        <>
            {loading ? (
                <CustomSkeleton errorMessage={error}/>
            ) : (
                <>
                    <Row className="align-items-center pb-3">
                        <Col className="col-8">Продажи по Казахстану</Col>
                        <Col className="col-4 pl-1">
                            <DropdownButton
                                title={mode === 'month' ? 'за месяц' : 'за год'}
                                onSelect={(selectedMode) => setMode(selectedMode)}
                            >
                                <Dropdown.Item eventKey="month">за месяц</Dropdown.Item>
                                <Dropdown.Item eventKey="year">за год</Dropdown.Item>
                            </DropdownButton>
                        </Col>


                    </Row>
                    <ResponsiveContainer >
                        <BarChart width={600} height={300} data={data} >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="_id"/>
                            <YAxis  />
                            <Bar dataKey="count" fill="#8884d8"/>


                        </BarChart>
                    </ResponsiveContainer>

                </>




            )}
        </>
    )
}

export default SalesDiagram