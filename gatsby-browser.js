/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
const React = require("react");
const { SearchProvider } = require("./src/hooks/useSearchContext");

module.exports = {
    wrapRootElement: ({ element }) => (
        <SearchProvider>
            {element}
        </SearchProvider>
    )
};