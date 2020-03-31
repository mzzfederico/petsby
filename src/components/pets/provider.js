import React from "react";
import { useGetAnimalById } from "../../hooks/useDataQuery";

export default function PetProvider({ id, children }) {
    const state = useGetAnimalById({ id });
    return children(state);
}