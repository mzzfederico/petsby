import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle }) => (
    <header>
        <div>
            <h1>
                <Link to="/">
                    {siteTitle}
                </Link>
            </h1>
        </div>

        <style jsx>{`
            header div {
                text-align: center;
            }

            header div h1 {
                font-size: 1.5rem;
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
