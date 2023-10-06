import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import CurrencyDiagram from "../components/Dashboard/CurrencyDiagram";
import SalesDiagram from "../components/Dashboard/SalesDiagram";
import RequestDiagram from "../components/Dashboard/RequestDiagram";
import KpiDiagram from "../components/Dashboard/KpiDiagram";

const DashboardPage = () => {
    return (<>

            <h2 className="pb-5 pt-2">Дашбоард: Анализ заявок компании</h2>
            <Container className="bg-body-secondary m-0">
                <Row className="p-0 justify-content-start">
                    <Col className="col-md-12"> <CurrencyDiagram/> </Col>
                </Row>
                <Row className="p-0 justify-content-start">
                    <Col> <SalesDiagram/> </Col>
                    <Col> <RequestDiagram/> </Col>
                    <Col> <KpiDiagram/> </Col>
                </Row>

            </Container>
        </>)
}

export default DashboardPage