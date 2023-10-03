import React from "react";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import CurrencyDiagram from "./CurrencyDiagram";

const Layout = ({ children }) => {
    return (
        <div className="DashboardInterface">
            <Row> <CurrencyDiagram/> </Row>
            <Row>
                <Col></Col>
            </Row>
        </div>
    );
}

export default Layout;
