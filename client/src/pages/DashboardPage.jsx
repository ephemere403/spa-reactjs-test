import React from "react";
import CurrencyDiagram from "../components/CurrencyDiagram";
import SalesDiagram from "../components/SalesDiagram";
import RequestDiagram from "../components/RequestDiagram";
import KpiDiagram from "../components/KpiDiagram";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DashboardPage = () => {
    return (
        <div>
            <h2>Дашбоард: Анализ заявок компании</h2>

            <Row>
                <Col> <CurrencyDiagram/> </Col>
            </Row>
            <Row>
                <Col> <SalesDiagram/> </Col>
                <Col> <RequestDiagram/> </Col>
                <Col> <KpiDiagram/> </Col>
            </Row>

        </div>
    )
}

export default DashboardPage