import React from "react";
import {getAuth} from "firebase/auth";

export const ProtectedPage: React.FC = () => {

    const auth = getAuth();

    return(
        <div style={{
            minHeight: '1000px',
            marginTop: '60px'
        }}>
            Protected page
        </div>
    )
}