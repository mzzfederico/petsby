import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import SearchBlock from "../components/search";
import ResultsBlock from "../components/results";

const IndexPage = () => (
    <Layout>
        <SEO title="Search" />
        <SearchBlock />
        <ResultsBlock />
    </Layout>
);

export default IndexPage;