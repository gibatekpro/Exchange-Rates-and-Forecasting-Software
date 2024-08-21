import React, {useEffect} from "react";
import {Button, Card, Col, Container, InputGroup, Row} from "react-bootstrap";
import backgroundImage3 from "../assets/images/backgroundImage3.webp";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";
import {getFieldValue} from "../util/utils";
import FormValue from "../model/FormValue";
import formValue from "../model/FormValue";
import {Option} from "react-bootstrap-typeahead/types/types";
import {ConversionApiResponse} from "../model/ConversionApiResponse";
import ForecastFormValue from "../model/ForecastFormValue";
import forecastFormValue from "../model/ForecastFormValue";
import {useFormik} from "formik";
import * as Yup from "yup";

type ForecastComponentProps = {
    submitForm: (values: ForecastFormValue) => void;
    initialValues: forecastFormValue;
    options: Option[];
    isLoading: boolean;
    baseSelection: Option[];
    forecastSelection: Option[];
    setForecastSelection: React.Dispatch<React.SetStateAction<Option[]>>
    setBaseSelection: React.Dispatch<React.SetStateAction<Option[]>>
}


export const ForecastComponent: React.FC<ForecastComponentProps> =
    ({
         submitForm,
         options,
         initialValues,
         isLoading,
         baseSelection,
         forecastSelection,
         setForecastSelection,
         setBaseSelection

     }) => {

        const [hover, setHover] = React.useState(false);
        const today = new Date();
        const minDate = new Date(today);
        const maxDate = new Date(today);

        //Sets minimum date to tomorrow
        minDate.setDate(minDate.getDate());

        //Sets maximum date to two months from today
        maxDate.setMonth(maxDate.getMonth() + 2);

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
        };    //Current date

        const ConversionSchema = Yup.object().shape({
            date: Yup.date()
                .required('Required')
                .max(maxDate, 'Date cannot be beyond one month')
                .min(minDate, 'Date must be future date')
        });
        const {setFieldValue, values, errors, touched, handleSubmit, handleChange} = useFormik({
            initialValues: initialValues,
            validationSchema: ConversionSchema,
            onSubmit: values => {

                submitForm(values);
            },
        });
        const handleIconClickForecast = () => {
            const tempSelection = baseSelection;

            setBaseSelection(forecastSelection);
            setForecastSelection(tempSelection);

            const newFromSelection = forecastSelection;
            const newToSelection = baseSelection;

            setFieldValue('baseCurrency', getFieldValue(newFromSelection));
            setFieldValue('forecastCurrency', getFieldValue(newToSelection));
        };

        //Fetches the currency list
        useEffect(() => {

            //Finds the option with the label containing "USD"
            const usdOption = options.find(option => (option as any).label.includes("USD"));
            if (usdOption) {
                setForecastSelection([usdOption]);
                setFieldValue('forecastCurrency', (usdOption as any).value)
            }

            //Finds the option with the label containing "GBP"
            const gbpOption = options.find(option => (option as any).label.includes("GBP"));
            if (gbpOption) {
                setBaseSelection([gbpOption]);
                setFieldValue('baseCurrency', (gbpOption as any).value)
            }

            setFieldValue('method', "sma")

        }, [options]);

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
                        backgroundImage: `url(${backgroundImage3})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
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
                                        <Col lg={5}>
                                            <div style={{
                                                ...designBorder,
                                            }}>
                                                <div>
                                                    Base Currency
                                                </div>
                                                <Form.Group controlId="baseCurrency">
                                                    <Typeahead
                                                        id="baseCurrency"
                                                        labelKey="label"
                                                        onChange={(selected) => {
                                                            setFieldValue('baseCurrency', getFieldValue(selected));
                                                            setBaseSelection(selected);
                                                            console.log('selected option', selected)
                                                        }}
                                                        options={options}
                                                        placeholder="Select a currency..."
                                                        selected={baseSelection}
                                                        size={fieldSize}
                                                    />
                                                    {errors.baseCurrency && touched.baseCurrency ? (
                                                        <Form.Control.Feedback type="invalid"
                                                                               style={{display: 'block'}}>
                                                            {errors.baseCurrency}
                                                        </Form.Control.Feedback>
                                                    ) : null}
                                                </Form.Group>
                                            </div>
                                        </Col>
                                        <Col lg={2}>
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
                                                    onClick={handleIconClickForecast}
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
                                        <Col lg={5}>
                                            <div style={{
                                                ...designBorder,
                                            }}>
                                                <div>
                                                    Forecast Currency
                                                </div>
                                                <Form.Group controlId="toSelection">
                                                    <Typeahead
                                                        id="forecastCurrency"
                                                        labelKey="label"
                                                        onChange={(selected) => {
                                                            setFieldValue('forecastCurrency', getFieldValue(selected));
                                                            setForecastSelection(selected);
                                                        }}
                                                        options={options}
                                                        placeholder="Select a currency..."
                                                        selected={forecastSelection}
                                                        size={fieldSize}
                                                    />
                                                    {errors.forecastCurrency && touched.forecastCurrency ? (
                                                        <Form.Control.Feedback type="invalid"
                                                                               style={{display: 'block'}}>
                                                            {errors.forecastCurrency}
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

                                        <Col lg={4}>
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
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "end",
                                                alignContent: "end",
                                                ...designBorder,
                                            }}>
                                                <fieldset>
                                                    <Form.Group controlId='method'>
                                                        <Form.Check
                                                            type="radio"
                                                            label="Simple Moving Average"
                                                            name="method"
                                                            defaultChecked={true}
                                                            value="sma"
                                                            id="formHorizontalRadios1"
                                                            onChange={handleChange}
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label="Exponential Moving Average"
                                                            name="method"
                                                            value="ema"
                                                            id="formHorizontalRadios2"
                                                            onChange={handleChange}
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label="Least Square Method"
                                                            name="method"
                                                            value="lsm"
                                                            id="formHorizontalRadios3"
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </fieldset>
                                            </div>
                                        </Col>
                                        <Col lg={1}>
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
                                                    flex: 1,
                                                    width: '100%'
                                                }}>
                                                    Forecast
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