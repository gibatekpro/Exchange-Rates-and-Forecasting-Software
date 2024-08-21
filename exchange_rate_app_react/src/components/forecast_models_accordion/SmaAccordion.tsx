import React from "react";


type SmaAccordionProps = {
    id: string
    title: string
}

export const SmaAccordion: React.FC<SmaAccordionProps> = ({id, title}) => {

    return (
        <div className="accordion-item">
            <h4 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#${id}`} aria-expanded="true"
                        aria-controls={`${id}`}>
                    {title}
                </button>
            </h4>
            <div id={`${id}`} className="accordion-collapse collapse show"
                 data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <h3>Simple Moving Average (SMA)</h3>

                    <br/>
                    <p>The simplest type of moving average is the Simple Moving Average(SMA). It calculates the average
                        price over which a certain number of days (usually 10 days) calculated backwards from your input
                        date. For example, a 10-day SMA will simply add up the closing prices from the last 10 days and
                        then divide by ten. Because the SMA weights all data points equally, it can lag behind recent
                        price moves — yet remains useful in revealing major market trends.
                    </p>


                    <p>The formula for calculating the Simple Moving Average (SMA) is given by:</p>

                    {/* Displayed formula using MathJax */}
                    <p>
                        {"\\["}
                        {"\\text{SMA} = \\frac{P_1 + P_2 + \\dots + P_n}{n}"}
                        {"\\]"}
                    </p>
                    <div style={{
                        textAlign: "left"
                    }}>
                        <p>Where:</p>
                        <ul>
                            <li>\( P_1, P_2, \dots, P_n \) are the prices (or data points) over the last \( n \)
                                periods.
                            </li>
                            <li>\( n \) is the number of periods.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );

}