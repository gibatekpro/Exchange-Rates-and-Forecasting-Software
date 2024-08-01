import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputMask from "react-input-mask";

// Define an interface for the component props
interface CustomDatePickerProps {
    wrapperClassName?: string;
    dateFormat?: string;
    selected?: Date | undefined | null;
    onChange: (date: Date | null, event: React.SyntheticEvent<any> | undefined) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
                                                               wrapperClassName,
                                                               dateFormat,
                                                               selected,
                                                               onChange
                                                           }) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <DatePicker
            customInput={<InputMask mask="99/99/9999" />}
            renderCustomHeader={({
                                     date,
                                     changeYear,
                                     changeMonth,
                                     decreaseMonth,
                                     increaseMonth,
                                     prevMonthButtonDisabled,
                                     nextMonthButtonDisabled
                                 }) => (
                <div className="input-group input-group-sm input-group-calender">
                    <div className="input-group-prepend">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                decreaseMonth();
                            }}
                            disabled={prevMonthButtonDisabled}
                            className="btn btn-outline-secondary"
                            type="button"
                        >
                            {"<"}
                        </button>
                    </div>

                    <input
                        type="number"
                        onChange={({ target: { value } }) => changeYear(Number(value))}
                        value={date.getFullYear()}
                        className="form-control"
                        aria-label="Year"
                    />
                    <select
                        className="form-control"
                        value={months[date.getMonth()]}
                        onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                        }
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <div className="input-group-append">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                increaseMonth();
                            }}
                            disabled={nextMonthButtonDisabled}
                            className="btn btn-outline-secondary"
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            )}
            wrapperClassName={wrapperClassName}
            className="form-control"
            dateFormat="dd/MM/yyyy"
            selected={selected}
            onChange={onChange}
        />
    );
};

export default CustomDatePicker;
