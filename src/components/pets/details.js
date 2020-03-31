import React from "react";
import SEO from "../seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faFemale, faDog, faCat } from "@fortawesome/free-solid-svg-icons";

export default function PetDetails({ pet = false }) {
    const { name, photos, breeds, species, size, gender, description, published_at, age, coat, status, url } = pet;
    return (
        <article className="pet-details">
            {photos.slice(0, 1).map(
                photo => <img key={"picture"} className={"pet-picture"} src={photo.medium} title={`${name} - ${breeds.primary}`} />
            )}

            <SEO title={`${name} - ${breeds.primary}`} />
            <header>
                <h1>{name} </h1>
                <h2>{breeds.primary}</h2>
            </header>
            <section className="icons">
                <span className="species">
                    {species === "Dog" && <FontAwesomeIcon icon={faDog} />}
                    {species === "Cat" && <FontAwesomeIcon icon={faCat} />}
                </span>
                <span className="gender">
                    {gender === "Male" && <FontAwesomeIcon icon={faMale} />}
                    {gender === "Female" && <FontAwesomeIcon icon={faFemale} />}
                </span>
                <span className="size">
                    {/* small, medium, large, xlarge */}
                    {size === "Small" && "s"}
                    {size === "Medium" && "m"}
                    {size === "Large" && "l"}
                    {size === "Xlarge" && "xl"}
                </span>
            </section>
            <section className="description">
                <PubblicationTime date={new Date(published_at)} />
                <div className="body">
                    <p>{description}</p>
                    <p className="characters">
                        <ul>
                            <li><b>Age:</b> {age}</li>
                            {coat && <li><b>Coat:</b> {coat}</li>}
                            <li><b>Status:</b> {status}</li>
                        </ul>
                    </p>
                    <p>
                        <a className={"link"} href={url}>Petfinder.com</a>
                    </p>
                </div>
            </section>
            <style jsx>{`
                .pet-details {
                    overflow: hidden;
                    padding: 1rem;
                    box-shadow: 0 12px 100px 8px rgba(0,0,0,.1);
                    border-radius: 1rem;

                }

                .pet-picture {
                    float: right;
                }

                h1, h2 {
                    padding: 0;
                    margin: 0;
                    font-weight: 300;
                    font-style: italic;
                }

                h1 {
                    color: rebeccapurple;
                }

                header, section {
                    margin-bottom: 2rem;
                }

                .characters ul {
                    list-style: none;
                    margin: 0; padding: 0;
                }

                .icons span {
                    margin-right: 1rem;
                    font-size: 1.25;
                    font-variant: small-caps;
                    font-weight: bold;
                    background-color: #cecece;
                    border-radius: 0.25rem;
                    padding: 0.15rem 0.25rem;
                }

                .link {
                    font-variant: small-caps;
                    text-decoration: none;
                    color: white;
                    text-transform: lowercase;
                    background-color: rebeccapurple;
                    border-radius: 0.25rem;
                    padding: 0.25rem 0.5rem;
                }
            `}</style>
        </article>
    );
}

function PubblicationTime({ date = new Date() }) {
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    return (
        <time>Published: {month}/{day}/{year}</time>
    );
}