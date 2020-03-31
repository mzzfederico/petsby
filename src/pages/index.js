import React from "react";
import { Link } from "gatsby";

import Container from "../components/container";
import SEO from "../components/seo";
import SearchBlock from "../components/search/search";
import RecentList from "../components/pets/recent";

const IndexPage = () => (
    <Container>
        <SEO title="Home" />
        <SearchBlock />
        <RecentList />
    </Container>
);

export default IndexPage;
