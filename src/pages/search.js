import React from "react";

import Container from "../components/container";
import SEO from "../components/seo";
import SearchBlock from "../components/search/search";
import ResultsBlock from "../components/search/results";
import FiltersBlock from "../components/search/filters";

const IndexPage = () => (
    <Container>
        <SEO title="Search" />
        <SearchBlock />
        <FiltersBlock />
        <ResultsBlock />
    </Container>
);

export default IndexPage;