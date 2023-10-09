import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomSkeleton from "../Skeleton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {PieChart, Pie, Cell, Label, ResponsiveContainer} from "recharts";

const KpiDiagram = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [mode, setMode] = useState('month')

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/fetchApplies/KPI`, {
                    params: {
                        timeframe: mode
                    }
                })
                const kpiPercentage = response.data.kpiPercentage
                setData([
                    {name: 'KPI', value: kpiPercentage},
                    {name: 'Remaining', value: 100 - kpiPercentage}
                ])
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
    }, [mode])

    return (<>
            {loading ? (
                <CustomSkeleton errorMessage={error}/>
            ) : (
                <>
                    <Row className="align-items-center pb-3">
                        <Col className="col-sm-6 col-lg-8"><h6>KPI</h6></Col>
                        <Col className="col-sm-6 col-lg-2">
                            <DropdownButton
                                title={mode === 'month' ? 'за месяц' : 'за день'}
                                onSelect={(selectedMode) => setMode(selectedMode)}
                            >
                                <Dropdown.Item eventKey="month">за месяц</Dropdown.Item>
                                <Dropdown.Item eventKey="day">за день</Dropdown.Item>
                            </DropdownButton>
                        </Col>


                    </Row>
                    <ResponsiveContainer style={{maxHeight: "300px"}}>
                        <PieChart width={300} height={300} >
                            <Pie data={data} dataKey="value" fill="#8884d8" innerRadius={50} outerRadius={80}
                                 paddingAngle={2} startAngle={90} endAngle={-270}>
                                {
                                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={index === 0 ? "#e0e0e0" :  "#8884d8" }/>)
                                }
                                <Label value={`${(data[1]?.value || 0).toFixed(1)}%`} position="center" fill="#000000" fontSize={20} />

                            </Pie>

                        </PieChart>
                    </ResponsiveContainer>

                </>


            )}
        </>
    )
}

export default KpiDiagram