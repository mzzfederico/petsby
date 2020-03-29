import React, { useContext, useReducer } from "react";

const DEFAULT_SEARCH_STATE = {
    city: "",
    species: "dog",
    age: "",
    page: 1
};

const SearchContext = React.createContext();

export default function useSearchContext() {
    const [state, dispatch] = useContext(SearchContext);

    const setCity = city => dispatch({ type: "setCity", city });
    const setSpecies = species => dispatch({ type: "setSpecies", species });
    const setPage = page => dispatch({ type: "setPage", page });
    const setAge = age => dispatch({ type: "setAge", age });

    return {
        ...state,
        setCity,
        setSpecies,
        setPage,
        setAge
    };
}

export const SearchProvider = ({ children }) => {
    const reducer = (state, action) => {
        if (action.type === "setCity") return ({ ...state, city: action.city });
        if (action.type === "setSpecies") return ({ ...state, species: action.species });
        if (action.type === "setPage") return ({ ...state, page: action.page });
        return state;
    };

    const [state, dispatch] = useReducer(reducer, DEFAULT_SEARCH_STATE);

    const { Provider } = SearchContext;
    return (
        <Provider value={[state, dispatch]}>{children}</Provider>
    );
};
