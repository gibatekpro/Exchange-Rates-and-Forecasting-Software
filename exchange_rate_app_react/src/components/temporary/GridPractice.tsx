import React, {useState} from "react";
import {Button, Card, Col, Container, InputGroup, Row} from "react-bootstrap";
import {ButtonTimeSeries} from "../ButtonTimeSeries";

export const GridPractice: React.FC = () => {

    const designBorder = {
        border: '1px solid black',
        minHeight: '10px'
        // border: 'none',
    };

    return (
        <div style={{
            marginTop: '60px',
            ...designBorder
        }}>
            <Row className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-12
                            row-gap-3 row-gap-sm-3 row-gap-md-3 row-gap-lg-0"
                 style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                 }}>
                <Col lg={1}>
                    <div style={{
                        ...designBorder,
                    }}>
                    </div>
                </Col>
                <Col lg={1}>
                    <div style={{
                        ...designBorder,
                    }}>
                    </div>
                </Col>
                <Col lg={1}>
                    <div style={{
                        ...designBorder,
                    }}>
                    </div>
                </Col>
                <Col lg={1}>
                    <div style={{
                        ...designBorder,
                    }}>
                    </div>
                </Col>
                <Col lg={1}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...designBorder,
                    }}>
                    </div>
                </Col>
                <Col lg={1}>
                    <div style={{
                        ...designBorder,
                    }}>
                    </div>
                </Col>
                <Col lg={1}>
                    <div style={{
                        ...designBorder,
                    }}>
                    </div>
                </Col>
                <Col lg={1}>
                    <div style={{
                        ...designBorder,
                    }}>
                    </div>
                </Col>
                <Col lg={1}>
                    <div style={{
                        ...designBorder,
                    }}>
                    </div>
                </Col>
                <Col lg={1}>
                    <div style={{
                        ...designBorder,
                    }}>
                    </div>
                </Col>
                <Col lg={1}>
                    <div style={{
                        ...designBorder,
                    }}>
                    </div>
                </Col>
                <Col lg={1}>
                    <div style={{
                        ...designBorder,
                    }}>
                    </div>
                </Col>
            </Row>
        </div>
    )


}