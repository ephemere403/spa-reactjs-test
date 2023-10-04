import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import CurrencyDiagram from "../components/Dashboard/CurrencyDiagram";
import SalesDiagram from "../components/Dashboard/SalesDiagram";
import RequestDiagram from "../components/Dashboard/RequestDiagram";
import KpiDiagram from "../components/Dashboard/KpiDiagram";

const DashboardPage = () => {
    return (
        <Container>
            <h2>Дашбоард: Анализ заявок компании</h2>

            <Row>
                <Col> <CurrencyDiagram/> </Col>
            </Row>
            <Row>
                <Col> <SalesDiagram/> </Col>
                <Col> <RequestDiagram/> </Col>
                <Col> <KpiDiagram/> </Col>
            </Row>

        </Container>
    )
}

export default DashboardPage