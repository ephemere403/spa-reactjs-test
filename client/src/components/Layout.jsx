import React from "react";
import Sidebar from "./Sidebar";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Row>
                <Col className="col-2"><Sidebar /></Col>
                <Col className="content">
                    {children}
                </Col>
            </Row>
        </div>
    );
}

export default Layout;
