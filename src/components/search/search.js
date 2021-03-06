import React from "react";
import PropTypes from "prop-types";
import useSearchContext from "../../hooks/useSearchContext";
import Searchbar from "./searchbar";
import { Link } from "gatsby";
import SimpleRadio from "./radios";

export default function SearchBlock() {
    const { setSpecies, city, ...data } = useSearchContext();

    const radios = (
        (["dog", "cat"])
            .map(species => <SimpleRadio
                key={species}
                value={species}
                onSelection={() => setSpecies(species)} checked={data.species === species}
            />)
    );

    return (
        <div className="search">
            <form>
                <Searchbar />

                <div className="search-details">
                    <div className="species">
                        {radios}
                    </div>

                    {city && <Link to={"/search"}>Search</Link>}
                </div>
            </form>

            <style global jsx>{`
                .search {
                    padding: 1rem;
                    box-shadow: 0 12px 100px 8px rgba(0,0,0,.1);
                    border-radius: 1rem;

                }

                .search form {
                    width: 100%;
                }

                .search .search-details {
                    width: 100%;
                }

                .search .search-details .species {
                    display: inline-block;
                    margin-right: 1rem;
                    padding: 0.5rem;
                }

                .search .search-details a {
                    float: right;
                    background: transparent;
                    border: 1px solid rebeccapurple;
                    font-variant: small-caps;
                    text-decoration: none;
                    text-transform: lowercase;
                    padding: 0.5rem;
                }
            `}</style>
        </div>
    );
}
