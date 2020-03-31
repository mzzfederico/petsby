import React from "react";
import PropTypes from "prop-types";

export default function SimpleRadio({ value, onSelection, checked = false }) {
    return (
        <label htmlFor={value} style={{ marginRight: "1rem" }}>
            <span style={{ marginRight: "0.5rem" }}>{value}</span> <input onChange={() => onSelection()} type="radio" value={value} checked={checked} />
        </label>
    );
}

SimpleRadio.propTypes = {
    value: PropTypes.string,
    onSelection: PropTypes.func,
    checked: PropTypes.bool
};