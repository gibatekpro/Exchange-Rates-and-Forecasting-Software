import React from "react";
import {Col, Row} from "react-bootstrap";
import ConversionContainerB from "./ConversionContainerB";

const BackDesign = () => {
    const designBorder = {
        // border: '1px solid black',
        // border: 'none',
    };
    return (
        <div style={{
            marginTop: '60px',
            height: '500px',
            position: 'relative',
            ...designBorder
        }}>
            <Col style={{
                ...designBorder
            }}>
                <Row style={{
                    backgroundColor: 'blue',
                    height: '300px',
                    ...designBorder
                }}>
                    {/* Content of the first row */}
                </Row>
                <Row style={{
                    height: '200px',
                    ...designBorder
                }}>
                    {/* Content of the second row */}
                </Row>
            </Col>
            <ConversionContainerB/>
        </div>

    );
}

export default BackDesign;