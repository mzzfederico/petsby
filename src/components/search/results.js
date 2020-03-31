import React from "react";
import useSearchContext from "../../hooks/useSearchContext";
import { useGetAnimals } from "../../hooks/useDataQuery";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale } from "@fortawesome/free-solid-svg-icons";
import { faFemale } from "@fortawesome/free-solid-svg-icons";

export default function ResultsBlock() {
    const { species, city } = useSearchContext();
    const { latitude, longitude } = city;
    const state = useGetAnimals({ type: species, gender: "male", age: "Adult", location: city ? `${latitude},${longitude}` : false });

    if (state.isLoading || state.data === false) {
        return (
            null
        );
    }

    return <div className="result-list">
        {state.data.animals.map(animal => <ResultItem key={animal.id} animal={animal} />)}

        <style jsx>{`
            .result-list {
                grid-column: 4 / 10;

                display: grid;
                grid-auto-rows: 15rem;
                grid-template-columns: 1fr 1fr;
                grid-row-gap: 1rem;
                grid-column-gap: 1rem;
            }
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