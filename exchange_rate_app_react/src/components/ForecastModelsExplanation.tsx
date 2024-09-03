import React from "react";
import {EmaAccordion} from "./forecast_models_accordion/EmaAccordion";
import {SmaAccordion} from "./forecast_models_accordion/SmaAccordion";
import {LsmAccordion} from "./forecast_models_accordion/LsmAccordion";

export const ForecastModelsExplanation: React.FC = () => {
    return (
        <section className="text-center container py-0 py-sm-0 py-md-0 py-lg-0 mt-2 mt-sm-2 mt-md-2 mt-lg-0">
            <div className="row py-0 py-sm-0 py-md-0 py-lg-0 mt-2 mt-sm-2 mt-md-2 mt-lg-0">
                <div className="">
                    <h1 className="h1">Currency Forecasting</h1>
                    <p className="lead text-body-secondar" style={{
                        textAlign: "justify"
                    }}>
                        A widely practiced method in currency prediction is
                        the technical analysis approach: where historical data
                        on price and trade volume are collated to make future predictions.
                        In this method, they will search historical market data
                        (like price and volume) in order to find repeating patterns & trends
                        with mathematical indicators. By predicting future changes in
                        currency exchange rates, traders and analysts can use these patterns
                        to their advantage.

                    </p>
                    <p className="lead text-body-secondar" style={{
                        textAlign: "justify"
                    }}>
                        The Moving Average is very popular method in technical analysis (MA).
                        A moving average is simply a statistical measure that averages the price
                        of an asset over time, however, it does this at each point within your data
                        by continually updating itself to help smooth out past price data. The more a
                        moving average smoothens the data (only volatile short-term changes become noise),
                        the easier it becomes to identify trends in this information.
                    </p>
                    <p className="lead text-body-secondar" style={{
                        textAlign: "justify"
                    }}>
                        Technical analysis models analyse trends and predicts future movements of ones
                        currency by using statistical mathematics to moving averages or Least Mean Squares etc.
                        These resources are important for traders and analysts to understand the insides of foreign
                        currency market, meanwhile grabbing opportunities. The models used in this website are discussed
                        below.
                    </p>
                        <br/>
                        <div className="accordion" id="accordionExample">
                            <SmaAccordion title={"Simple Moving Average"} id={"collapseTwo"}/>
                            <EmaAccordion title={"Exponential Moving Average"} id={"collapseOne"}/>
                            <LsmAccordion title={"Least Square Model"} id={"collapseThree"}/>
                        </div>
                </div>
            </div>
        </section>
)
}