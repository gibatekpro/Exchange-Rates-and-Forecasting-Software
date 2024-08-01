import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form';
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Dropdown,
    ButtonGroup,
    FormControl,
    InputGroup,
    Table
} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {Option} from "react-bootstrap-typeahead/types/types";
import {Formik} from "formik";
import * as Yup from "yup";
import FormValue from "../model/FormValue";
import CustomDatePicker from "./custom_datepicker/CustomDatePicker";

const ConversionContainerD = () => {

    const designBorder = {
        // border: '1px solid black',
        // border: 'none',
    };

    const cardWidth = {
        width: '26rem'
    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            ...designBorder
        }}>
            <Card className="responsive-card border-0" style={{
                flex: '1 1 auto',
                maxWidth: '64rem',
            }}>
                <Card.Body>
                    <Row className="
                                    row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-12
                                    row-gap-5 row-gap-sm-5 row-gap-md-5 row-gap-lg-0
                                    "
                         style={{
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'start',
                             ...designBorder
                         }}>
                        <Col className="justify-content-center justify-content-lg-start" lg={6} style={{
                            display: 'flex',
                            alignItems: 'start',
                            ...designBorder
                        }}>
                            <Card style={{
                                ...cardWidth
                            }}>
                                <Card.Header as="h4">
                                    Special title treatment
                                </Card.Header>
                                <Card.Body>
                                    <Table>
                                        <tbody>
                                        {Array.from({ length: 11 }).map((_, index) => (
                                            <tr key={index}>
                                                <td>50 Euros</td>
                                                <td>Us Dollars</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="justify-content-center justify-content-lg-end" lg={6} style={{
                            display: 'flex',
                            alignItems: 'center',
                            ...designBorder
                        }}>
                            <Card style={{
                                ...cardWidth
                            }}>
                                <Card.Header as="h4">
                                    Special title treatment
                                </Card.Header>
                                <Card.Body>
                                    <Table>
                                        <tbody>
                                        {Array.from({ length: 11 }).map((_, index) => (
                                            <tr key={index}>
                                                <td>50 USDs</td>
                                                <td>European Euros</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </div>
    );

}


export default ConversionContainerD;