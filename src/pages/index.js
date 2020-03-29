import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import SearchBlock from "../components/search";

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <SearchBlock />
    </Layout>
);

export default IndexPage;
