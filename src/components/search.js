import React from "react";
import { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import useSearchContext from "../hooks/useSearchContext";

export default function SearchBlock() {
    const { setCity, setSpecies, ...data } = useSearchContext();

    const radios = (
        (["dog", "cat"])
            .map(species => <SpeciesRadio
                key={species}
                species={species}
                onSelection={() => setSpecies(species)} checked={data.species === species}
            />)
    );

    return (
        <div className="search">
            <form
                style={{
                    width: "100%",
                    padding: "2rem 0"
                }}
                onSubmit={e => e.preventDefault()}
                action="/search">

                <Searchbar value={data.city} onChange={search => setCity(search)} />

                <div className="search-details" style={{ width: "100%", marginBottom: "2rem" }}>
                    <div className="species" style={{ display: "inline-block", marginRight: "1rem" }}>
                        {radios}
                    </div>

                    <input type="submit" value="search" style={{ float: "right" }} />
                </div>

            </form>
        </div>
    );
}

const Searchbar = ({ value = "", onChange, name = "city", placeholder = "Where are you located?" }) => {
    /* Prevents annoying autocomplete after clicking on a button to autocomplete */
    const [autocompleted, setAutocompleted] = useState(false);

    const { allCitiesJson: json } = useStaticQuery(graphql`
        query CitiesQuery {
            allCitiesJson {
                edges {
                    node {
                        id,
                        city,
                        state
                    }
                }
            }
        }
    `);
    const cities = json.edges;

    const handleInput = (event) => {
        const { target } = event;
        onChange(target.value);
        setAutocompleted(false);
    };

    const handleAutocomplete = (event) => {
        const { target } = event;
        onChange(target.value);
        setAutocompleted(true);
    };

    const autocompletions = cities
        .map(edge => edge.node)
        .filter(({ city, state }) => {
            if (value === city) return false; // Already inserted a correct city!
            if (city.includes(value)) return true;
            if (state.includes(value)) return true;
            return false;
        })
        .map(
            ({ id, city, state }) => (
                <li key={id} style={{ display: "inline" }}>
                    <button
                        style={{ background: "transparent", border: "1px solid purple", margin: "0.25rem" }}
                        value={city} onClick={handleAutocomplete}>{city}, {state}</button>
                </li>
            )
        );

    return (
        <div className="search-searchbar" style={{ width: "100%", marginBottom: "2rem" }}>
            <input
                style={{ width: "100%", marginBottom: "1rem", padding: "0.75rem", fontSize: "1.5rem" }}
                type="text" name={name} id={name} placeholder={placeholder}
                onChange={handleInput}
                value={value}
            />

            {value.length > 3 && autocompletions.length > 0 && autocompleted !== true
                ? <div className="autocomplete" style={{ fontSize: "0.75rem" }}>
                    <em>Did you mean...</em>
                    <ul style={{ display: "inline", listStyle: "none" }}>{autocompletions.slice(0, 9)}</ul>
                </div>
                : null}
        </div>
    );
};

Searchbar.propTypes = {
    value: PropTypes.string, onChange: PropTypes.func, name: PropTypes.string, placeholder: PropTypes.string
};

const SpeciesRadio = ({ species, onSelection, checked = false }) => (
    <label htmlFor={species} style={{ marginRight: "1rem" }}>
        <span style={{ marginRight: "0.5rem" }}>{species}</span> <input onChange={() => onSelection()} type="radio" value={species} checked={checked} />
    </label>
);

SpeciesRadio.propTypes = {
    species: PropTypes.string,
    onSelection: PropTypes.func,
    checked: PropTypes.bool
};