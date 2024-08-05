import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form';
import {Button, Card, Container, Row, Col, Dropdown, ButtonGroup, FormControl} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {Option} from "react-bootstrap-typeahead/types/types";

const ConversionContainer = () => {
    const [singleSelections, setSingleSelections] = useState([]);
    const [multiSelections, setMultiSelections] = useState([] as Option[]);
    const [options, setOptions] = useState([] as Option[]);
    const [hover, setHover] = React.useState(false);
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
    const xsFieldSmall: number = 2
    const lgFieldSmall: number = 1
    const lgField: number = 1
    const xsField: number = 1

    useEffect(() => {
        const option: Option[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']
        setOptions(option);
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: '20px'
        }}>
            <Card className="responsive-card" style={{
                flex: '1 1 auto',
                maxWidth: '75rem',
                margin: '60px',
            }}>
                <Card.Body>
                    <Container>
                        <Row className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-4">
                            <Col>
                                <div>
                                    Amount
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
                            </Col>
                            <Col >
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
                            </Col>
                            <Col lg={lgFieldSmall}
                                 style={{
                                     display: 'flex',
                                     justifyContent: 'center',
                                     alignItems: 'center'
                                 }}>
                                <div
                                    style={hover ? {...iconStyle, ...hoverStyle} : iconStyle}
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>
                                    </svg>
                                    {/*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                                    {/*     className="bi bi-arrow-down-up" viewBox="0 0 16 16">*/}
                                    {/*    <path fillRule="evenodd"*/}
                                    {/*          d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>*/}
                                    {/*</svg>*/}
                                </div>
                            </Col>
                            <Col>
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
                            </Col>
                        </Row>
                        <div style={{
                            height: '18px',
                        }}>
                        </div>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );

}

export default ConversionContainer;