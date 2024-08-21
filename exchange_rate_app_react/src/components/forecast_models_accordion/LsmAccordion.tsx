import React from "react";


type LsmAccordionProps = {
    id: string
    title: string
}

export const LsmAccordion: React.FC<LsmAccordionProps> = ({id, title}) => {

    return (
        <div className="accordion-item">
            <h4 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#${id}`} aria-expanded="true"
                        aria-controls={`${id}`}>
                    {title}
                </button>
            </h4>
            <div id={`${id}`} className="accordion-collapse collapse"
                 data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <h3>Least Square Model</h3>

                    <br/>

                    <p>
                        The Least Squares method, is one of the most basic statistical methods used in a variety of
                        fields — (e.g Economics/ Finance / Data analysis) specially modeling when it comes to
                        forecasting. Least Squares approach primarily aims at finding the best line, also termed as
                        "line of best fit" that goes through data points which reduces error between observed value
                        and predicted values from straight. It is very easy to use in forecasts, for
                        instance in forecasting where often the goal is predicting future values based on past trends
                        or benefits. Analysts apply the Least Squares model to historical data which enables them to
                        on some level discover a mathematical formula that represents an underlying pattern in the data.
                        This equation is then used to predict future values assuming that the past trends will continue
                        into the future. This auto regression property of the Least Squares model is what makes this
                        technique as a very important tool when it comes to forecasting trends.
                    </p>

                    {/* Displayed formula using MathJax */}
                    <p>The equation of the line of best fit is given by:</p>
                    <p>{"\\[ y = mx + c \\]"}</p>

                    <p>The slope (\( m \)) is calculated as:</p>
                    <p>{"\\[ m = \\frac{N \\sum{x_i y_i} - \\sum{x_i} \\sum{y_i}}{N \\sum{x_i^2} - (\\sum{x_i})^2} \\]"}</p>

                    <p>The intercept (\( c \)) is calculated as:</p>
                    <p>{"\\[ c = \\frac{\\sum{y_i} - m \\sum{x_i}}{N} \\]"}</p>

                    <div style={{
                        textAlign: "left"
                    }}>
                        <p>Where:</p>
                        <ul>
                            <li> y is the predicted value.</li>
                            <li>\( m \) is the slope of the line.</li>
                            <li>\( x \) is the independent variable.</li>
                            <li>\( c \) is the y-intercept.</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

    );

}