import React, { useReducer } from "react";
import { useEffect } from "react";

const DEFAULT_QUERY_STATE = {
    isLoading: false,
    isError: false,
    data: {},
    error: {}
};

const queryReducer = (state, action) => {
    const actions = {
        "fetching": (state) => ({ ...state, isLoading: true }),
        "done": (state, action) => ({ ...state, isLoading: false, data: action.data }),
        "error": (state, action) => ({ ...state, isLoading: false, isError: true, error: action.error })
    };
    const isValidAction = type => Object.keys(actions).includes(type);
    if (isValidAction(action.type)) return action[action.type](state, action);
    return state;
};

export function useDataQuery({ url, searchParams }) {
    const [state, dispatch] = useReducer(queryReducer, DEFAULT_QUERY_STATE);

    const queryDeps = Object.entries(searchParams).map(([key, value]) => value);

    useEffect(() => {
        (async function () {
            dispatch({ type: "fetching" });
            try {
                const response = await fetch(url, { searchParams });
                const json = response.json();
                return dispatch({ type: "done", data: json });
            } catch (error) {
                return dispatch({ type: "error", error });
            }
        })();
    }, [url, ...queryDeps]);

    return state;
}