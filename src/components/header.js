import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle }) => (
    <header className="titlebar">
        <div>
            <h1>
                <Link to="/">
                    {siteTitle}
                </Link>
            </h1>
        </div>

        <style global jsx>{`
            header.titlebar {

            }

            header.titlebar div {
                text-align: left;
            }

            header.titlebar div h1 {
                font-size: 1.5rem;
            }

            header.titlebar div h1 a {
                font-variant: small-caps;
                text-decoration: none;
                font-weight: 300;
                text-transform: lowercase;
            }
        `}</style>
    </header>
);

Header.propTypes = {
    siteTitle: PropTypes.string,
};

Header.defaultProps = {
    siteTitle: "",
};

export default Header;
