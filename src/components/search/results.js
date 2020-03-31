import React from "react";
import useSearchContext from "../../hooks/useSearchContext";
import { useGetAnimals } from "../../hooks/useDataQuery";

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
    const { name, age, gender, size, description, photos } = animal;

    const imgSet = photos.map((photo, index) => photo.medium);

    return (
        <div className={"result-item"}>
            <div className="image">
                <img src={imgSet[0]} />
            </div>
            <div className="info">
                <h2>{name}</h2>
                <span className="desc">{description}</span>
            </div>

            <style jsx>{`
                .result-item {
                    position: relative;
                    padding: 1rem;
                    background: #555;
                    color: white;

                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-column-gap: 1rem;
                }

                .result-item .image {
                    grid-column: 1 / 2;
                    overflow: hidden;
                }

                .result-item .mage img {
                    width: 100%;
                    display: block;
                }
            `}</style>
        </div>
    );
}