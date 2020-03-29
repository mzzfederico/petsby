import React from "react";
import useSearchContext from "../hooks/useSearchContext";
import { useGetAnimals } from "../hooks/useDataQuery";

export default function ResultsBlock() {
    const { species, city } = useSearchContext();
    const { latitude, longitude } = city;
    const state = useGetAnimals({ type: species, gender: "male", age: "Adult", location: `${latitude},${longitude}` });

    if (state.isLoading || state.data === false) {
        return (
            null
        );
    }

    return (
        <ul className="results-block" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {state.data.animals.map(animal => (
                <li key={animal.id}>
                    <ResultItem animal={animal} />
                </li>
            ))}
        </ul>

    );
}

export function ResultItem({ animal }) {
    const { name, age, gender, size, description, photos } = animal;

    const imgSet = photos.map((photo, index) => (
        <img key={index} src={photo.medium} alt={name} />
    ));

    return (
        <div className={"result-item"}>
            <div className="image-container">
                {imgSet[0]}
            </div>
            <h2>{name}</h2>
            <span className="desc">{description}</span>
        </div>
    );
}