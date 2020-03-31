import React, { useContext, useReducer } from "react";

const DEFAULT_SEARCH_STATE = {
    city: "",
    species: "dog",
    age: "",
    page: 1
};

// Without initializing the context as the useReducer tuple, Gatsby won't render it
const SearchContext = React.createContext([DEFAULT_SEARCH_STATE, () => { }]);

/**
 * Gets the state from the global search provider, and exposes methods to change it
 */
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

/**
 * Wraps the application to provide a set of actions and a common state
 */
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
