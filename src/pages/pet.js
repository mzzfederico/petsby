import React from "react";

import Container from "../components/container";
import PetDetails from "../components/pets/details";
import PetProvider from "../components/pets/provider";

const PetPage = (props) => {
    const { pageContext, id } = props;

    return (
        <Container>
            {
                "pet" in pageContext
                    ? (
                        <PetDetails pet={pageContext.pet} />
                    )
                    : (
                        <PetProvider id={id}>
                            {({ data, isLoading, isError }) => {
                                if (isLoading) return null;
                                if (data) return <PetDetails pet={data.animal} />;
                                return "Not found.";
                            }}
                        </PetProvider>
                    )
            }
        </Container>
    );
};

export default PetPage;
