import React from "react";
import useSearchContext from "../../hooks/useSearchContext";
import { useGetAnimals } from "../../hooks/useDataQuery";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale } from "@fortawesome/free-solid-svg-icons";
import { faFemale } from "@fortawesome/free-solid-svg-icons";

const selectedCategoriesToString = object => (
    Object
        .entries(object)
        .filter(([, boolean]) => boolean)
        .map(([entry,]) => entry)
        .join(",")
);

export default function ResultsBlock() {
    const { species, gender, age, city, page, setPage } = useSearchContext();
    const { latitude, longitude } = city;
    const state = useGetAnimals({
        type: species,
        gender: selectedCategoriesToString(gender),
        age: selectedCategoriesToString(age),
        location: city ? `${latitude},${longitude}` : false,
        page
    });

    if (state.isLoading || state.data === false) {
        return (
            null
        );
    }

    const handleNext = event => {
        event.preventDefault();
        setPage(page + 1);
    };

    const handlePrevious = event => {
        event.preventDefault();
        setPage(page - 1);
    };

    return <div className="result-list">
        {state.data.animals.map(animal => <ResultItem key={animal.id} animal={animal} />)}

        {state.data.pagination.total_pages > 0 && (
            <div className="pagination">
                <div className="left">
                    {page > 1 && <a className={"page back"} onClick={handlePrevious}>←  back</a>}
                </div>
                <div className="center">
                    <span className="page current">{page}</span>
                </div>
                <div className="right">
                    {page < state.data.pagination.total_pages && <a className={"page forward"} onClick={handleNext}>forward →</a>}
                </div>
            </div>
        )}

        <style jsx>{`
            .result-list {
                display: grid;
                grid-auto-rows: 15rem;
                grid-template-columns: 1fr 1fr;
                grid-row-gap: 1rem;
                grid-column-gap: 1rem;
            }

            .pagination {
                grid-column: 1 / 3;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }

            .pagination > div > a { cursor: pointer; font-variant: small-caps}

            .pagination .center { text-align: center }
            .pagination .right { text-align: right }
        `}</style>

    </div>;
}

export function ResultItem({ animal }) {
    const { name, age, gender, size, photos, id, species } = animal;

    const imgSet = photos.map((photo, index) => photo.medium);

    return (
        <div className={"result-item"}>
            <div className="image">
                <img src={imgSet[0]} />
            </div>
            <div className="info">
                <h2>
                    {name}{" "}
                    <span className="gender">
                        {gender === "Male" && <FontAwesomeIcon icon={faMale} />}
                        {gender === "Female" && <FontAwesomeIcon icon={faFemale} />}
                    </span>
                </h2>
                <div className={"description"}>
                    <ul>
                        <li><b>Age:</b> {age}</li>
                        <li><b>Size:</b> {size}</li>
                    </ul>
                </div>
                <Link to={`/${species.toLowerCase()}/${id}`}>more details</Link>
            </div>

            <style jsx global>{`
                .result-item {
                    box-shadow: 0 12px 100px 8px rgba(0,0,0,.1);
                    border-radius: 1rem;

                    position: relative;
                    padding: 1rem;
                    border: 1px solid white;

                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-column-gap: 1rem;
                }

                .result-item .image {
                    text-align: center;
                    grid-column: 1 / 2;
                    overflow: hidden;
                    position: relative;
                }

                .result-item .image img {
                    height: 100%;
                    position: absolute;
                    margin: auto;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }

                .result-item .description ul {
                    list-style: none;
                    padding: 0;
                    font-size: 0.8rem;
                }

                .result-item a {
                    font-weight: 300;
                    text-transform: lowercase;
                    margin-right: 1rem;
                    font-size: 0.9rem;
                    font-variant: small-caps;
                    background-color: #cecece;
                    border-radius: 0.25rem;
                    padding: 0.15rem 0.5rem;
                    text-decoration: none;
                    color: black;
                }
            `}</style>
        </div>
    );
}