import React from "react";
import PropTypes from "prop-types";
import useSearchContext from "../../hooks/useSearchContext";
import Searchbar from "./searchbar";

export default function SearchBlock() {
    const { setSpecies, ...data } = useSearchContext();

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

                <Searchbar />

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