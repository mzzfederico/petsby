/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";

const Container = ({ children }) => {
    const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

    return (
        <>
            <div className="container">
                <Header siteTitle={data.site.siteMetadata.title} />

                {children}

                <style jsx>{`
                `}</style>

                <style global jsx>{`
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, “Roboto”, “Droid Sans”, “Helvetica Neue”, Helvetica, Arial, sans-serif;
                    }

                    .container {
                        min-height: 95vh;
                        max-width: 70rem;
                        margin: 0 auto;
                    }

                    .container > div {
                        margin-bottom: 1rem;
                    }
                `}</style>
            </div>
        </>
    );
};

Container.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Container;
