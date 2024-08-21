import React from "react";


type EmaAccordionProps = {
    id: string
    title: String
}

export const EmaAccordion: React.FC<EmaAccordionProps> = ({id,title}) =>{

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
                    <h3>Exponential Moving Average (EMA)</h3>

                    <br/>
                    <p>The EMA is an enhanced moving average that gives more weight to recent prices. Such weighting
                    options make the EMA more reactive to new information and short-term price fluctuations than
                    an equivalent period SMA. If you want to catch short-term changes, EMA will be your best friend
                    as it gives much more weight than the Simple Moving Average does to most recent data of the asset
                    (currency), reflecting better on current market sentiment. However, for long future forecasts,
                    do not use EMA.
                    </p>
                    <p style={{
                        textAlign: "center"
                    }}>The formula for calculating the Exponential Moving Average (EMA) is given by:</p>
                    {/* Displayed formula using MathJax */}
                    <p style={{
                        textAlign: "left"
                    }}>
                        {"\\[ EMA_t = \\large{( {{V_t} \\space \\times \\space { s \\over {1+d}}}) \\space + \\space (EMA_y \\space \\times \\space (1 \\space - {s \\over {1+d}}))} \\]"}
                    </p>

                    <p>Where:</p>
                    <ul style={{
                        textAlign: "left"
                    }}>
                        <li>{"\\( \\text{EMA}_t \\)"} is the Exponential Moving Average for today.</li>
                        <li>{"\\( V_t \\)"} is the value (e.g., price) for today.</li>
                        <li>{"\\( s/(1+d) \\)"} is the smoothing factor.</li>
                        <li>{"\\( s \\)"} is typically 2.</li>
                        <li>{"\\( d \\)"} is the number of days in the EMA period.</li>
                        <li>{"\\( \\text{EMA}_{y} \\)"} is the Exponential Moving Average for yesterday.</li>
                    </ul>
                </div>
            </div>
        </div>

    );

}