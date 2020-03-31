import React from "react";

import Container from "../components/container";
import PetDetails from "../components/pets/details";
import PetProvider from "../components/pets/provider";

const PetPage = (props) => {
    const { pageContext, id } = props;

    if ("pet" in pageContext) {
        return (
            <Container>
                <PetDetails pet={pageContext.pet} />
            </Container>
        );
    }

    if (id) {
        return (
            <Container>
                <PetProvider id={id}>
                    {({ data, isLoading }) => {
                        if (isLoading) return null;
                        if (data) return <PetDetails pet={data.animal} />;
                        return "Not found.";
                    }}
                </PetProvider>
            </Container>
        );
    }

    return "Not found.";
};

export default PetPage;
