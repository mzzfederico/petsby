import React, { useEffect, useReducer } from "react";
import { graphql, useStaticQuery } from "gatsby";
import useSearchContext from "../../hooks/useSearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

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
            <li key={id}>
                <button onClick={() => handleAutocomplete(id)}>{city}, {state}</button>

                <style jsx>{`
                    li { display: inline; }
                    button {
                        display: inline; background-color: purple; border: 0; border-radius: 0.5rem;
                        color: white; border-radius: 0.125rem; margin-right: 0.25rem; margin-bottom: 0.25rem;
                        padding: 0.25rem 0.5rem;
                    }
                `}</style>
            </li>
        )
    );

    const showCompletions = !barState.isCompleted && suggestions.length > 0 && barState.inputValue.length > 0;
    const noCompletionsFound = !barState.isCompleted && suggestions.length === 0 && barState.inputValue.length > 0;

    return (
        <div className="search-searchbar">
            {!barState.isCompleted && <input
                type="text" placeholder={"Insert your city..."}
                onChange={handleInput} value={barState.inputValue}
            />}

            {barState.isCompleted && <span>
                <span style={{}}>{barState.selected.city} <button onClick={() => handleClear()}><FontAwesomeIcon icon={faTimesCircle} /></button></span>
            </span>}

            {showCompletions
                ? <div className="autocomplete" style={{ fontSize: "0.75rem" }}>
                    <em>Did you mean...</em>
                    <ul>{suggestions.slice(0, 9)}</ul>
                </div>
                : null}

            {noCompletionsFound
                ? <div className="autocomplete error">
                    <em>{"Sorry, we couldn't find a city"}.</em>
                </div>
                : null}

            <style jsx>{`
                .search-searchbar {
                    margin-bottom: 1rem;
                }
                .search-searchbar > input, .search-searchbar > span {
                    width: calc(100% - 2rem);
                    padding: 0.75rem;
                    margin-bottom: 1rem;
                    font-size: 1.25rem;
                    background-color: #f5f5f5;
                    box-shadow: none;
                    border: 0;
                    display: block;
                }

                .search-searchbar > span { font-style: italic; }
                .search-searchbar > span > span { padding: 0.15rem 0.5rem; border: 1px solid #b5b5b5; border-radius: 0.5rem; }
                .search-searchbar > span > span button {padding: 0.15rem 0.5rem; background-color: transparent; border: 0; }

                .autocomplete { font-size: 0.75rem; }
                .autocomplete.error { color red; }
                .autocomplete ul { display: inline; list-style: none; }
            `}</style>
        </div>
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