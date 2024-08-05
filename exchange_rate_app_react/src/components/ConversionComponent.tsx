import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form';
import {Button, Card, Container, Row, Col, Dropdown, ButtonGroup, FormControl, InputGroup} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {Formik, useFormik, useFormikContext} from "formik";
import * as Yup from "yup";
import FormValue from "../model/FormValue";
import CustomDatePicker from "./custom_datepicker/CustomDatePicker";
import * as util from "node:util";
import {Util} from "../util/utils";
import {ConversionApiResponse} from "../model/ConversionApiResponse";
import {Option} from "react-bootstrap-typeahead/types/types";
import formValue from "../model/FormValue";

// Initial state value
const initialConversionData: ConversionApiResponse = {
    success: false,
    query: {
        from: "",
        to: "",
        amount: 0,
    },
    info: {
        timestamp: 0,
        rate: 0,
    },
    date: "",
    historical: false,
    result: 0,
};


// Define the types for the props of ConversionComponent
type ConversionComponentProps = {
    submitForm: (values: FormValue) => void;
    initialValues: formValue;
    options: Option[];
    conversionData: ConversionApiResponse;
    isLoading: boolean;
    fromSelection: Option[];
    toSelection: Option[];
    setToSelection: React.Dispatch<React.SetStateAction<Option[]>>
    setFromSelection: React.Dispatch<React.SetStateAction<Option[]>>
};


const ConversionComponent: React.FC<ConversionComponentProps> = (
    {
        submitForm,
        initialValues,
        options,
        conversionData,
        isLoading,
        fromSelection,
        toSelection,
        setToSelection,
        setFromSelection
    }) => {
    const [hover, setHover] = React.useState(false);
    const {setFieldValue, values, errors, touched, handleSubmit, handleChange} = useFormik({
        initialValues: initialValues,
        onSubmit: values => {

            console.log(JSON.stringify(values) + ">>>>>>>>>>>>>>>")
            submitForm(values);
        },
    });

    //Fetches the currency list
    useEffect(() => {

        // Find the option with the label containing "USD"
        const usdOption = options.find(option => (option as any).label.includes("USD"));
        if (usdOption) {
            setToSelection([usdOption]);
            setFieldValue('toCurrency', (usdOption as any).value)
        }

        // Find the option with the label containing "GBP"
        const gbpOption = options.find(option => (option as any).label.includes("GBP"));
        if (gbpOption) {
            setFromSelection([gbpOption]);
            setFieldValue('fromCurrency', (gbpOption as any).value)
        }

    }, [options]);


    type Size = 'sm' | 'lg' | undefined;
    const fieldSize: Size = 'lg';
    const iconStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px', // Adjust the width as needed
        height: '40px', // Adjust the height to match the width for a perfect circle
        backgroundColor: '#f0f0f0', // Light gray background, change as per your design
        borderRadius: '50%', // This creates the circular shape
        padding: '5px',
        cursor: 'pointer', // Changes the cursor to indicate it's clickable
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Optional: adds a subtle shadow for better visual effect
        transition: 'background-color 0.3s, box-shadow 0.3s', // Smooth transition for hover effects
    };
    const hoverStyle = {
        backgroundColor: '#e0e0e0', // Darker shade on hover
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)', // Larger shadow on hover for a "lifting" effect
    };
    const designBorder = {
        // border: '1px solid black',
        // border: 'none',
    };

    const today = new Date(); // Current date
    const minDate = new Date('1970-01-01'); // Set minimum date to January 1, 1970

    const ConversionSchema = Yup.object().shape({
        amount: Yup.string()
            .min(1, 'Too Short!')
            .max(25, 'Too Long!')
            .required('Required'),
        date: Yup.date()
            .required('Required')
            .max(today, 'Date cannot be in the future')
            .min(minDate, 'Date cannot be before January 1, 1970')
    });

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

    function getFieldValue(selected: Option[]): any {
        if (selected.length > 0) {
            return selected.map(option => {
                const jsonOption = JSON.stringify(option);
                const parsedOption = JSON.parse(jsonOption);
                return parsedOption.value;
            })[0];
        }
        return '';
    }

    const handleIconClick = () => {
        const tempSelection = fromSelection;

        setFromSelection(toSelection);
        setToSelection(tempSelection);

        const newFromSelection = toSelection;
        const newToSelection = fromSelection;

        console.log("From selection is ===" + getFieldValue(newFromSelection));
        console.log("To selection is ===" + getFieldValue(newToSelection));

        setFieldValue('fromCurrency', getFieldValue(newFromSelection));
        setFieldValue('toCurrency', getFieldValue(newToSelection));
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}>
                <Card className="responsive-card bg-body-tertiary shadow" style={{
                    position: 'absolute',
                    top: '180px',
                    flex: '1 1 auto',
                    maxWidth: '75rem',
                }}>
                    <Card.Body>
                        <Form noValidate
                              onSubmit={handleSubmit}>
                            <Container>
                                <Row className="
                                    row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-12
                                    row-gap-3 row-gap-sm-3 row-gap-md-3 row-gap-lg-0
                                    "
                                     style={{
                                         display: 'flex',
                                         justifyContent: 'center',
                                         alignItems: 'center',
                                     }}>
                                    <Col lg={3}>
                                        <div style={{
                                            ...designBorder,
                                        }}>
                                            <div>
                                                Amount
                                            </div>
                                            <Form.Group controlId="amount">
                                                <InputGroup>
                                                    <InputGroup.Text id="inputGroupPrepend">£</InputGroup.Text>
                                                    <Form.Control
                                                        type="text"
                                                        name="amount"
                                                        value={values.amount}
                                                        onChange={(event) => {
                                                            const formattedValue = formatCurrencyInput(event.target.value);
                                                            setFieldValue("amount", formattedValue);
                                                        }}
                                                        isValid={touched.amount && !errors.amount}
                                                        isInvalid={errors.amount != null}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.amount}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col lg={4}>
                                        <div style={{
                                            ...designBorder,
                                        }}>
                                            <div>
                                                From
                                            </div>
                                            <Form.Group controlId="fromCurrency">
                                                <Typeahead
                                                    id="fromCurrency"
                                                    labelKey="label"
                                                    onChange={(selected) => {
                                                        setFieldValue('fromCurrency', getFieldValue(selected));
                                                        setFromSelection(selected);
                                                        console.log('selected option', selected)
                                                    }}
                                                    options={options}
                                                    placeholder="Select a currency..."
                                                    selected={fromSelection}
                                                    size={fieldSize}
                                                />
                                                {errors.fromCurrency && touched.fromCurrency ? (
                                                    <Form.Control.Feedback type="invalid"
                                                                           style={{display: 'block'}}>
                                                        {errors.fromCurrency}
                                                    </Form.Control.Feedback>
                                                ) : null}
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col lg={1}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            ...designBorder,
                                        }}>
                                            <div
                                                style={hover ? {...iconStyle, ...hoverStyle} : iconStyle}
                                                onMouseEnter={() => setHover(true)}
                                                onMouseLeave={() => setHover(false)}
                                                onClick={handleIconClick}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor"
                                                     className="bi bi-arrow-left-right d-none d-lg-block"
                                                     viewBox="0 0 16 16">
                                                    <path fillRule="evenodd"
                                                          d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor"
                                                     className="bi bi-arrow-down-up d-block d-lg-none"
                                                     viewBox="0 0 16 16">
                                                    <path fillRule="evenodd"
                                                          d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4}>
                                        <div style={{
                                            ...designBorder,
                                        }}>
                                            <div>
                                                To
                                            </div>
                                            <Form.Group controlId="toSelection">
                                                <Typeahead
                                                    id="toCurrency"
                                                    labelKey="label"
                                                    onChange={(selected) => {
                                                        setFieldValue('toCurrency', getFieldValue(selected));
                                                        console.log(JSON.stringify(selected) + "====")
                                                        setToSelection(selected);
                                                    }}
                                                    options={options}
                                                    placeholder="Select a currency..."
                                                    selected={toSelection}
                                                    size={fieldSize}
                                                />
                                                {errors.toCurrency && touched.toCurrency ? (
                                                    <Form.Control.Feedback type="invalid"
                                                                           style={{display: 'block'}}>
                                                        {errors.toCurrency}
                                                    </Form.Control.Feedback>
                                                ) : null}
                                            </Form.Group>
                                        </div>
                                    </Col>
                                </Row>
                                <div style={{
                                    height: '18px',
                                }}>
                                </div>
                                <Row className="
                                    row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-12
                                    row-gap-3 row-gap-sm-3 row-gap-md-3 row-gap-lg-0
                                    "
                                     style={{
                                         display: 'flex',
                                         justifyContent: 'center',
                                         alignItems: 'center',
                                         ...designBorder
                                     }}
                                >

                                    <Col lg={3}>
                                        <div style={{
                                            ...designBorder,
                                        }}>
                                            <div>
                                                Date
                                            </div>
                                            <Form.Group controlId="date">
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                             height="16" fill="currentColor"
                                                             className="bi bi-calendar-date" viewBox="0 0 16 16">
                                                            <path
                                                                d="M6.445 11.688V6.354h-.633A13 13 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23"/>
                                                            <path
                                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                                                        </svg>
                                                    </InputGroup.Text>
                                                    {/*<CustomDatePicker*/}
                                                    {/*    wrapperClassName="datepicker"*/}
                                                    {/*    dateFormat="dd/MM/yyyy"*/}
                                                    {/*    selected={datepick}*/}
                                                    {/*    onChange={(date) => setDatePick(date)}*/}
                                                    {/*/>*/}
                                                    <Form.Control
                                                        type="date"
                                                        name="date"
                                                        value={values.date}
                                                        onChange={handleChange}
                                                        isValid={touched.date && !errors.date}
                                                        isInvalid={errors.date != null}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.date}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col lg={5}>
                                        <div style={{
                                            ...designBorder,
                                        }}>
                                            <Row>
                                                <div style={{
                                                    ...designBorder,
                                                }}>
                                                    {conversionData.query.amount} {conversionData.query.from} =
                                                </div>
                                            </Row>
                                            <Row>
                                                <div style={{
                                                    ...designBorder,
                                                }}>
                                                    <h2>
                                                        {formatCurrencyInput(conversionData.result.toString())} {conversionData.query.to}
                                                    </h2>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div style={{
                                                    ...designBorder,
                                                }}>
                                                    1 {conversionData.query.from} =
                                                    {formatCurrencyInput(conversionData.info.rate.toString())} {conversionData.query.to}
                                                </div>
                                            </Row>
                                            <Row>
                                                <div style={{
                                                    ...designBorder,
                                                }}>
                                                    1 {conversionData.query.to} = {formatCurrencyInput((1 / conversionData.info.rate).toString())} {conversionData.query.from}
                                                </div>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col lg={2}>
                                        <div style={{
                                            ...designBorder,
                                        }}>
                                            <h6 className="text-center" hidden={!isLoading}>
                                                <div className="spinner-border text-primary " role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </h6>
                                        </div>
                                    </Col>
                                    <Col lg={2}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                            ...designBorder,
                                        }}>
                                            <Button type="submit" variant="primary" size="sm" style={{
                                                flex: 1,  // Makes the button expand to fill all available space
                                                width: '100%' // Ensures the button stretches to full width
                                            }}>
                                                Convert
                                            </Button>{' '}
                                        </div>
                                    </Col>
                                </Row>
                                <div style={{
                                    height: '18px',
                                }}>
                                </div>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );

}


export default ConversionComponent;