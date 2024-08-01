import BackDesign from "../components/BackDesign";
import React from "react";
import ConversionContainerD from "../components/ConversionContainerD";

export const HomePage: React.FC = () => {
    return(
        <div>
            <div>
                <BackDesign/>
                <div className='d-lg-none' style={{
                    minHeight: "400px",
                }}>
                </div>
                <ConversionContainerD/>
            </div>
        </div>
    );
}