import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from 'react-bootstrap/Container'
import CurrencyDiagram from "../components/Dashboard/CurrencyDiagram"
import SalesDiagram from "../components/Dashboard/SalesDiagram"
import RequestDiagram from "../components/Dashboard/RequestDiagram"
import KpiDiagram from "../components/Dashboard/KpiDiagram"

const DashboardPage = () => {
    return (<>

            <h2 className="pb-5 pt-2">Дашбоард: Анализ заявок компании</h2>
            <Container className="m-0">
                <Row className="p-0 justify-content-start">
                    <Col className="col-md-12"> <CurrencyDiagram/> </Col>
                </Row>
                <Row className="p-0 pb-5">
                    <Col className="diagram col-12 col-md-6 col-lg-5 pb-5" style={{maxHeight:"300px"}} > <SalesDiagram/> </Col>
                    <Col className="diagram col-12 col-md-6 col-lg-5 pb-5" style={{maxHeight:"300px"}}> <RequestDiagram/> </Col>
                    <Col className="diagram col-12 col-md-6 col-lg-2 pb-5" style={{maxHeight:"300px"}}> <KpiDiagram/> </Col>
                </Row>

            </Container>
        </>)
}

export default DashboardPage