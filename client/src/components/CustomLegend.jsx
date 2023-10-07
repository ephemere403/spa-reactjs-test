import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CustomLegend = ({payload, totals}) => {
    return (
        <Row>
            {payload.map((entry, index) => (
                <Col key={`item-${index}`}>
                    <span style={{
                        display: 'inline-block',
                        backgroundColor: entry.color,
                        width: 10,
                        height: 10,
                        marginRight: 5
                    }}></span>
                    {entry.value}: {totals[entry.value]}
                </Col>
            ))}
        </Row>
    )
}

export default CustomLegend;
