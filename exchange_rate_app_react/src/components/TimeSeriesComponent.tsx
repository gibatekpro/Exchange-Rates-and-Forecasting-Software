import React, {useEffect, useState} from "react";
import {AgCharts} from "ag-charts-react";
import {AgChartOptions} from 'ag-charts-community';
import {TimeSeriesApiResponse} from "../model/TimeSeriesApiResponse";
import {ConversionApiResponse} from "../model/ConversionApiResponse";
import {GridPractice} from "./temporary/GridPractice";
import {Col, Row} from "react-bootstrap";
import {ButtonTimeSeries} from "./ButtonTimeSeries";

type TimeSeriesComponentProps = {
    timeSeriesData: TimeSeriesApiResponse,
    conversionData: ConversionApiResponse,
    timeSeriesLength: number,
    setTimeSeriesLength: React.Dispatch<React.SetStateAction<number>>
}

export const TimeSeriesComponent: React.FC<TimeSeriesComponentProps> = ({timeSeriesData, conversionData, timeSeriesLength, setTimeSeriesLength}) => {

    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const handleButtonSelect = (index: number, value: number) => {
        setSelectedButton(index);
        setTimeSeriesLength(value);
    };

    const designBorder = {
        // border: '1px solid black',
        // border: 'none',
    };

    //Function to transform the timeSeriesData into the format expected by the chart
    function transformData() {
        const ratesEntries = Object.entries(timeSeriesData.rates);

        const transformedData = ratesEntries.map(([date, rates]) => {

            return {
                date: date,
                value: rates[timeSeriesData.to] || 0,
            };
        });

        return transformedData;
    }

    //Calculates the number of days between two dates
    function calculateDaysBetween(timeSeriesData: TimeSeriesApiResponse): number {
        const start = new Date(timeSeriesData.start_date);
        const end = new Date(timeSeriesData.end_date);
        const differenceInTime = end.getTime() - start.getTime();
        return differenceInTime / (1000 * 3600 * 24);
    }

    const numberOfDays = calculateDaysBetween(timeSeriesData);

    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: `${timeSeriesData.base} to ${timeSeriesData.to} (Showing data for ${numberOfDays} days)` ,
        },
        data: transformData(),
        series: [
            {
                type: "line",
                xKey: "date",
                yKey: "value",
                yName: timeSeriesData.to,
            }
        ],
    });


    //Update chart options when timeSeriesData changes
    useEffect(() => {
        setOptions({
            ...options,
            title: {
                text: `${timeSeriesData.base} to ${timeSeriesData.to} (Showing data for ${numberOfDays} days)`,
            },
            data: transformData(),
            series: [
                {
                    type: "line",
                    xKey: "date",
                    yKey: "value",
                    yName: timeSeriesData.to,
                } as any
            ],
        });
    }, [timeSeriesData]);


    return(
        <div className="bg-body-tertiary" >

            <div className="bg-body-tertiary" style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '5%',
                marginLeft: '5%',
                padding: '5%',
                ...designBorder
            }}>
                <AgCharts options={options}/>

                <div style={{
                    marginTop: '60px',
                    ...designBorder
                }}>
                    <Row className="row row-cols-4 row-cols-sm-1=4 row-cols-md-4 row-cols-lg-12
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
                                <ButtonTimeSeries
                                    key={1}
                                    index={1}
                                    isSelected={selectedButton === 1}
                                    onSelect={handleButtonSelect}
                                    value = {7}
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
                                <ButtonTimeSeries
                                    key={2}
                                    index={2}
                                    isSelected={selectedButton === 2}
                                    onSelect={handleButtonSelect}
                                    value = {14}
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
                                <ButtonTimeSeries
                                    key={3}
                                    index={3}
                                    isSelected={selectedButton === 3}
                                    onSelect={handleButtonSelect}
                                    value = {30}
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
                                <ButtonTimeSeries
                                    key={4}
                                    index={4}
                                    isSelected={selectedButton === 4}
                                    onSelect={handleButtonSelect}
                                    value = {60}
                                />
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
            </div>
        </div>
    );
};
