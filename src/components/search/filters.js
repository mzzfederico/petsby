import React from "react";

import useSearchContext from "../../hooks/useSearchContext";
import SimpleRadio from "./radios";

export default function FiltersBlock() {
    const { checkGender, checkAge, ...data } = useSearchContext();

    const genderChoices = (
        Object.entries(data.gender)
            .map(([gender, bool]) => (
                <label key={gender}>
                    <span>{gender}</span>
                    <input
                        type="checkbox"
                        onChange={() => checkGender(gender, !bool)}
                        checked={bool}
                    />
                </label>
            ))
    );

    const ageChoices = (
        Object.entries(data.age)
            .map(([age, bool]) => (
                <label key={age}>
                    <span>{age}</span>
                    <input
                        type="checkbox"
                        onChange={() => checkAge(age, !bool)}
                        checked={bool}
                    />
                </label>
            ))
    );

    return (
        <div className="filters">
            <div className="gender">
                <em>genders:</em> {genderChoices}
            </div>
            <div className="age">
                <em>ages:</em> {ageChoices}
            </div>

            <style global jsx>{`
                .filters {
                    padding: 1rem;
                    box-shadow: 0 12px 100px 8px rgba(0,0,0,.1);
                    border-radius: 1rem;
                    font-size: 0.85rem;
                }

                .filters em {
                    margin-right: 1rem;
                    font-variant: small-caps;
                }

                .filters input[type=checkbox] {
                    margin-right: 1rem;
                }

                .filters > div:not(:last-child) {
                    padding-bottom: 0.125rem;
                }
            `}</style>
        </div>
    );
}