import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form';
import {Button, Card, Container, Row, Col, Dropdown, ButtonGroup, FormControl, InputGroup} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {Option} from "react-bootstrap-typeahead/types/types";
import {Formik} from "formik";
import * as Yup from "yup";
import FormValue from "../model/FormValue";
import CustomDatePicker from "./custom_datepicker/CustomDatePicker";

const ConversionContainerB = () => {
    const [singleSelections, setSingleSelections] = useState([]);
    const [multiSelections, setMultiSelections] = useState([] as Option[]);
    const [options, setOptions] = useState([] as Option[]);
    const [hover, setHover] = React.useState(false);
    const [datepick, setDatePick] = useState<Date | null | undefined>(null);
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
        fromCurrency: Yup.string()
            .min(1, 'Too Short!')
            .max(25, 'Too Long!')
            .required('Required'),
        toCurrency: Yup.string()
            .min(1, 'Too Short!')
            .max(25, 'Too Long!')
            .required('Required'),
        date: Yup.date()
            .required('Required')
            .max(today, 'Date cannot be in the future')
            .min(minDate, 'Date cannot be before January 1, 1970')
    });


    const submitForm = (values: FormValue) => {

        // handleProfileSubmit(values);
    }

    const initialValues: FormValue = {
        amount: 0, // default to 0 for a number
        fromCurrency: '', // empty string for a string type
        toCurrency: '', // empty string for a string type
        date: ''// current date for a Date type
    };

    function formatCurrencyInput(value: string): string {
        // Remove all non-numeric characters except the decimal point
        let num = value.replace(/[^\d.]/g, '');

        // If the input is empty, just a decimal point, or zero after removing non-digits, default to "0"
        if (num === "" || num === "." || parseFloat(num) === 0) {
            return "0";
        }

        // Handle multiple decimal points by keeping only the first
        let firstDecimalIndex = num.indexOf('.');
        if (firstDecimalIndex !== -1) {
            num = num.substring(0, firstDecimalIndex + 1) + num.substring(firstDecimalIndex + 1).replace(/\./g, '');
        }

        // Split number by decimal point
        let parts = num.split('.');
        // Remove leading zeros from the integer part and replace digits with comma separated values for thousands
        parts[0] = parseInt(parts[0], 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // If there is a decimal part, restrict it to only 2 digits
        if (parts.length > 1 && parts[1]) {
            parts[1] = parts[1].substring(0, 2);
        }

        // Rejoin the integer and decimal parts
        num = parts.join('.');
        return num;
    }



    useEffect(() => {
        const option: Option[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']
        setOptions(option);
    }, []);

    return (
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
                    <Formik
                        initialValues={initialValues}
                        validationSchema={ConversionSchema}
                        onSubmit={async (values, {setSubmitting}) => {
                            await new Promise((r) => setTimeout(r, 500));
                            submitForm(values);
                            setSubmitting(false);
                        }}>
                        {({handleSubmit, isSubmitting,setFieldValue, handleChange, values, touched, errors}) => (

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
                                                <Typeahead
                                                    defaultSelected={options.slice(0, 1)}
                                                    id="basic-typeahead-single"
                                                    labelKey="name"
                                                    onChange={(selected) => {
                                                        setMultiSelections(selected)
                                                    }}
                                                    options={options}
                                                    placeholder="Select a currency..."
                                                    selected={multiSelections}
                                                    size={fieldSize}
                                                />
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
                                                <Typeahead
                                                    defaultSelected={options.slice(0, 1)}
                                                    id="basic-typeahead-single"
                                                    labelKey="name"
                                                    onChange={(selected) => {
                                                        setMultiSelections(selected)
                                                    }}
                                                    options={options}
                                                    placeholder="Select a currency..."
                                                    selected={multiSelections}
                                                    size={fieldSize}
                                                />
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
                                        <Col lg={1}>
                                            <div style={{
                                                ...designBorder,
                                            }}>
                                                Date
                                            </div>
                                        </Col>
                                        <Col lg={2}>
                                            <div style={{
                                                ...designBorder,
                                            }}>
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
                                                        999.00 Euros =
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div style={{
                                                        ...designBorder,
                                                    }}>
                                                        <h2>
                                                            1,079.8918 US Dollars
                                                        </h2>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div style={{
                                                        ...designBorder,
                                                    }}>
                                                        1 EUR = 1.08097 USD
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div style={{
                                                        ...designBorder,
                                                    }}>
                                                        1 USD = 0.925093 EUR
                                                    </div>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col lg={2}>
                                            <div style={{
                                                ...designBorder,
                                            }}>

                                            </div>
                                        </Col>
                                        <Col lg={2}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'end',
                                                ...designBorder,
                                            }}>
                                                <Button variant="primary" size="sm" style={{
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
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        </div>
    );

}


export default ConversionContainerB;