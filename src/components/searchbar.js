import React, { useEffect, useReducer } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { PropTypes } from "prop-types";
import useSearchContext from "../hooks/useSearchContext";

export default function Searchbar() {
    const { allCitiesJson: json } = useStaticQuery(graphql`
        query CitiesQuery {
            allCitiesJson {
                edges {
                    node {
                        id,
                        city,
                        latitude,
                        longitude,
                        state
                    }
                }
            }
        }
    `);

    /* Prevents annoying autocomplete after clicking on a button to autocomplete */
    const { setCity, ...data } = useSearchContext();
    const [barState, dispatch] = useBarState();
    const { allCities, autocompleteCities } = useCitiesData(json, barState.inputValue);

    useEffect(() => {
        setCity(barState.selected);
    }, [barState.selected]);

    const handleInput = (event) => {
        const { target } = event;
        dispatch({ type: "writing", value: target.value });
    };

    const handleAutocomplete = (selection) => {
        dispatch({ type: "autocomplete", selection: allCities.find(city => city.id === selection) });
    };

    const handleClear = () => {
        dispatch({ type: "clear" });
    };

    const suggestions = autocompleteCities.map(
        ({ id, city, state }) => (
            <li key={id} style={{ display: "inline" }}>
                <button
                    style={{ background: "transparent", border: "1px solid purple", margin: "0.25rem" }}
                    onClick={() => handleAutocomplete(id)}>{city}, {state}</button>
            </li>
        )
    );

    const showCompletions = !barState.isCompleted && suggestions.length > 0 && barState.inputValue.length > 0;
    const noCompletionsFound = !barState.isCompleted && suggestions.length === 0 && barState.inputValue.length > 0;

    const styles = {
        searchBar: { width: "100%", marginBottom: "2rem" },
        cityInput: { width: "100%", marginBottom: "1rem", padding: "0.75rem", fontSize: "1.5rem", border: "1px solid rebeccapurple", display: "block" }
    };

    return (
        <div className="search-searchbar" style={styles.searchBar}>
            {!barState.isCompleted && <input
                style={styles.cityInput}
                type="text" name={name} id={name} placeholder={"Insert your city..."}
                onChange={handleInput} value={barState.inputValue}
            />}

            {barState.isCompleted && <span style={styles.cityInput}>
                <span style={{ padding: "0.15rem 0.5rem", border: "1px solid rebeccapurple", borderRadius: "0.5rem" }}>{barState.selected.city} <button style={{ color: "rebeccapurple", background: "transparent", border: "0" }} onClick={() => handleClear()}>x</button></span>
            </span>}

            {
                showCompletions
                    ? <div className="autocomplete" style={{ fontSize: "0.75rem" }}>
                        <em>Did you mean...</em>
                        <ul style={{ display: "inline", listStyle: "none" }}>{suggestions.slice(0, 9)}</ul>
                    </div>
                    : null
            }

            {
                noCompletionsFound
                    ? <div className="autocomplete" style={{ fontSize: "0.75rem", color: "red" }}>
                        <em>Sorry, we couldn't find a city.</em>
                    </div>
                    : null
            }
        </div >
    );
}

/** Handles all the relevant actions and states */
function useBarState() {
    const DEFAULT_BAR_STATE = {
        isCompleted: false,
        selected: false,
        inputValue: ""
    };

    const barReducer = (state, action) => {
        if (action.type === "autocomplete") return ({ ...state, selected: action.selection, isCompleted: true });
        if (action.type === "writing") return ({ ...state, inputValue: action.value, isCompleted: false, selected: false });
        if (action.type === "clear") return ({ ...state, isCompleted: false, selected: false });
        return state;
    };

    const [barState, dispatch] = useReducer(barReducer, DEFAULT_BAR_STATE);

    return [barState, dispatch];
}

/** Handles the cities data */
function useCitiesData(json, inputValue) {
    const allCities = json.edges.map(edge => edge.node);

    const autocompleteCities = allCities.filter(({ city, state }) => {
        if (city.includes(inputValue)) return true;
        return false;
    });

    return { allCities, autocompleteCities };
}