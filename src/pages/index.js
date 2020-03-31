import React from "react";
import { Link } from "gatsby";

import Container from "../components/container";
import SEO from "../components/seo";
import SearchBlock from "../components/search/search";

const IndexPage = () => (
    <Container>
        <SEO title="Home" />
        <SearchBlock />
    </Container>
);

export default IndexPage;
