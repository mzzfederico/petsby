import React, { useContext, useReducer } from "react";

const DEFAULT_SEARCH_STATE = {
    city: false,
    species: "dog",
    age: {
        baby: true, young: true, adult: true, senior: true
    },
    gender: {
        male: true, female: true
    },
    page: 1
};

// Without initializing the context as the useReducer tuple, Gatsby won't render it
const SearchContext = React.createContext([DEFAULT_SEARCH_STATE, () => { }]);

/**
 * Gets the state from the global search provider, and exposes methods to change it
 */
export default function useSearchContext() {
    const [state, dispatch] = useContext(SearchContext);

    const setCity = city => dispatch({ type: "setCity", city, page: 1 });
    const setSpecies = species => dispatch({ type: "setSpecies", species });
    const setPage = page => dispatch({ type: "setPage", page });
    const checkAge = (age, bool) => dispatch({ type: "checkAge", age, bool });
    const checkGender = (gender, bool) => dispatch({ type: "checkGender", gender, bool });

    return {
        ...state,
        setCity,
        setSpecies,
        setPage,
        checkAge,
        checkGender
    };
}

/**
 * Wraps the application to provide a set of actions and a common state
 */
export const SearchProvider = ({ children }) => {
    const reducer = (state, action) => {
        if (action.type === "setPage") return ({
            ...state,
            page: action.page
        });
        if (action.type === "setCity") return ({
            ...state,
            city: action.city,
            page: 1
        });
        if (action.type === "setSpecies") return ({
            ...state,
            species: action.species,
            page: 1
        });
        if (action.type === "checkAge") return ({
            ...state,
            age: { ...state.age, [action.age]: action.bool },
            page: 1
        });
        if (action.type === "checkGender") return ({
            ...state,
            gender: { ...state.gender, [action.gender]: action.bool },
            page: 1
        });
        return state;
    };

    const [state, dispatch] = useReducer(reducer, DEFAULT_SEARCH_STATE);

    const { Provider } = SearchContext;
    return (
        <Provider value={[state, dispatch]}>{children}</Provider>
    );
};
