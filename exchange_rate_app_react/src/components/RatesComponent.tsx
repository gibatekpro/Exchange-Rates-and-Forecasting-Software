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
import formValue from "../model/FormValue";
import {ConversionApiResponse} from "../model/ConversionApiResponse";


// Define the types for the props of ConversionComponent
type RatesComponentProps = {
    conversionData: ConversionApiResponse;
};



const RatesComponent:React.FC<RatesComponentProps> = (
    {
        conversionData
    }) => {

    const designBorder = {
        // border: '1px solid black',
        // border: 'none',
    };

    const cardWidth = {
        width: '26rem'
    }


    function formatCurrencyInput(value: string): string {
        //Removes all non-numeric characters except the decimal point
        let num = value.replace(/[^\d.]/g, '');

        if (num === "" || num === "." || parseFloat(num) === 0) {
            return "0";
        }

        //Handles multiple decimal points by keeping only the first
        let firstDecimalIndex = num.indexOf('.');
        if (firstDecimalIndex !== -1) {
            num = num.substring(0, firstDecimalIndex + 1) + num.substring(firstDecimalIndex + 1).replace(/\./g, '');
        }

        //Splits number by decimal point
        let parts = num.split('.');
        // Remove leading zeros from the integer part and replace digits with comma separated values for thousands
        parts[0] = parts[0].replace(/^0+/, ''); // Remove leading zeros
        if (parts[0] === '') parts[0] = '0'; // Ensure at least a zero if the integer part is empty
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        //Rejoins the integer and decimal parts
        num = parts.join('.');
        return num;
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
                                    {conversionData.query.from} to {conversionData.query.to}
                                </Card.Header>
                                <Card.Body>
                                    <Table>
                                        <tbody>
                                        {Array.from({ length: 10 }).map((_, index) => {
                                            const value = (index + 1) * 100;
                                            const result = value * conversionData.info.rate;
                                            return (
                                                <tr key={index}>
                                                    <td>{formatCurrencyInput(value.toString())} {conversionData.query.from}</td>
                                                    <td>{formatCurrencyInput(result.toString())} {conversionData.query.to}</td>
                                                </tr>
                                            );
                                        })}
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
                                    {conversionData.query.to} to {conversionData.query.from}
                                </Card.Header>
                                <Card.Body>
                                    <Table>
                                        <tbody>
                                        {Array.from({length: 10}).map((_, index) => {
                                            const value = (index + 1) * 100;
                                            const result = value / conversionData.info.rate;
                                            return (
                                                <tr key={index}>
                                                    <td>{formatCurrencyInput(value.toString())} {conversionData.query.to}</td>
                                                    <td>{formatCurrencyInput(result.toString())} {conversionData.query.from}</td>
                                                </tr>
                                            );
                                        })}
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


export default RatesComponent;