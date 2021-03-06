import { useReducer } from "react";
import { useEffect } from "react";
import { resources } from "../api";
import useAuthToken from "./useAuthToken";
import ky from "ky";

const DEFAULT_QUERY_STATE = {
    isLoading: false,
    isError: false,
    data: false,
    error: {}
};

const queryReducer = (state, action) => {
    const actions = {
        "fetching": (state) => ({ ...state, isLoading: true, data: false }),
        "done": (state, action) => ({ ...state, isLoading: false, data: action.data }),
        "error": (state, action) => ({ ...state, isLoading: false, isError: true, error: action.error })
    };
    const isValidAction = type => Object.keys(actions).includes(type);
    if (isValidAction(action.type)) return actions[action.type](state, action);
    return state;
};

/* Gets the token from the localStorage, proceeds to get the data with a side effect */
export function useDataQuery({ url, searchParams, mandatoryParams = [] }) {
    const token = useAuthToken();
    const [state, dispatch] = useReducer(queryReducer, DEFAULT_QUERY_STATE);

    /* Cleans up all the searchParams that ends up unutilized */
    let cleanSearchParams = {};
    Object.entries(searchParams)
        .filter(([, value]) => value !== "")
        .map(
            ([key, value]) => {
                cleanSearchParams[key] = value;
            }
        );

    useEffect(() => {
        //skip effect if missing token
        if (!token) return;

        //skip effect if a mandatory parameter is not available
        if (mandatoryParams.some(entry => cleanSearchParams[entry] === false)) return;

        (async function () {
            // no token, we wait...
            if (token === false) return false;
            // yes token, we fetch...
            dispatch({ type: "fetching" });
            try {
                const response = await ky.get(url, {
                    searchParams: cleanSearchParams, headers: {
                        Authorization: `Bearer ${token.access_token}`
                    }
                });
                const json = await response.json();
                return dispatch({ type: "done", data: json });
            } catch (error) {
                return dispatch({ type: "error", error });
            }
        })();
    }, [token, url, JSON.stringify(cleanSearchParams)]);

    return state;
}

/** Alias of useDataQuery to handle getAnimals requests */
export function useGetAnimals({ type = "", gender = "", age = "", location = "", page = 1 }) {
    const state = useDataQuery({ url: resources.getAnimals, searchParams: { type, gender, age, location, page }, mandatoryParams: ["location"] });
    return state;
}
/** Alias of useDataQuery to handle getAnimals requests for a single animal*/
export function useGetAnimalById({ id }) {
    const state = useDataQuery({ url: `${resources.getAnimals}/${id}`, searchParams: {}, mandatory: [] });
    return state;
}