import React from "react";
import { graphql, Link } from "gatsby";
import { useStaticQuery } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faDog, faLink } from "@fortawesome/free-solid-svg-icons";

export default function RecentList() {
    const pages = useStaticQuery(graphql`
        query MyQuery {
            allSitePage {
                edges {
                    node {
                        id
                        context {
                            pet {
                                id
                                name
                                gender
                                species
                            }
                        }
                    }
                }
            }
        }
    `);

    return (
        <div className="recent-list">
            <h2>Recently published</h2>
            <ul>
                {pages.allSitePage.edges
                    .slice(0, 9)
                    .filter(({ node }) => node.context && node.context.pet)
                    .map(({ node }) => {
                        const { context, path } = node;
                        const { name, species, id, gender } = context.pet;
                        return (
                            <li key={id}>
                                {species === "Cat" && <span><FontAwesomeIcon icon={faCat} /></span>}
                                {species === "Dog" && <span><FontAwesomeIcon icon={faDog} /></span>}
                                <span><em>{name}</em> <Link to={`/${species.toLowerCase()}/${id}`}><FontAwesomeIcon icon={faLink} /></Link></span>
                            </li>
                        );
                    })
                }
            </ul>

            <style jsx>{`
                .recent-list {
                    box-shadow: 0 12px 100px 8px rgba(0,0,0,.1);
                    border-radius: 1rem;
                    grid-column: 4 / 10;
                }

                .recent-list h2 {
                    font-variant: small-caps;
                    font-weight: 300;
                    font-style: italic;
                    text-transform: lowercase;
                    padding: 0.25rem 1rem;
                    font-size: 1.25rem;
                }

                .recent-list ul {
                    list-style: none;
                    padding: 0;
                }

                .recent-list ul li {
                    padding: 0.25rem 1rem;
                }

                .recent-list ul li:nth-child(even) {
                    background-color: #f6f6f6;
                }

                .recent-list ul li span {
                    margin-right: 1rem;
                }

                .recent-list ul li a {
                    margin-right: 1rem;
                    text-decoration: none;
                    color: black;
                }
            `}</style>
        </div>
    );
}