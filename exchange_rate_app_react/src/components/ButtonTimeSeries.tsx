import React, {useState} from "react";

interface ButtonTimeSeriesProps {
    index: number;
    isSelected: boolean;
    onSelect: (index: number, value:number) => void;
    value: number;
}

export const ButtonTimeSeries: React.FC<ButtonTimeSeriesProps> = ({index, isSelected, onSelect, value}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () =>{

        onSelect(index,value);

    }


    const buttonStyle = {
        backgroundColor: isSelected ? '#0d6efd' : isHovered ? '#0d6efd' : 'white',
        color: isSelected ? 'white' : isHovered ? 'white' : 'black',
        border: '1px solid #0d6efd',
        borderRadius: '8px',
        padding: '5px 5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
        fontSize: '12px'
    };

    return (
        <button
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            disabled={isSelected}>
            {value} days
        </button>
    );

}
