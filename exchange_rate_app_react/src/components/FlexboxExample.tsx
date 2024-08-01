import React from 'react';
import './FlaxboxExample.css';

const FlexboxExample = () => {
    return (
        <div className="flex-container" style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <div className="flex-item">Item 1</div>
            <div className="flex-item">Item 2</div>
            <div className="flex-item">Item 3</div>
        </div>
    );
};

export default FlexboxExample;
