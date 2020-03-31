import React from "react";

import Container from "../components/container";
import SEO from "../components/seo";
import SearchBlock from "../components/search/search";
import ResultsBlock from "../components/search/results";

const IndexPage = () => (
    <Container>
        <SEO title="Search" />
        <SearchBlock />
        <ResultsBlock />
    </Container>
);

export default IndexPage;