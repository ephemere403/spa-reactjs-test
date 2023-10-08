import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CustomLegend = ({payload, totals}) => {
    return (
        <Row>
            {payload.map((entry, index) => (
                    <Col key={`item-${index}`} className="col-sm-6 col-lg-3 pb-4">
                    <span style={{
                        display: 'inline-block',
                        backgroundColor: entry.color,
                        width: 10,
                        height: 10,
                        marginRight: 5
                    }}></span>
                        <h6 style={{display: 'inline-block'}}> {entry.value} - {totals[entry.value]} </h6>
                    </Col>
            ))}
        </Row>
    )
}

export default CustomLegend;
