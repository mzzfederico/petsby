import { useEffect } from "react";
import { resources } from "../api";
import useLocalStorage from "./useLocalStorage";
import ky from "ky";

/** Fetches a new token whenever necessary by calling the lambda */
export default function useAuthToken() {
    const [token, saveToken] = useLocalStorage("petfinder_token", false);

    useEffect(
        () => {
            if (token === false) {
                (async function () {
                    const data = await ky.get(resources.fetchToken);
                    const json = await data.json();
                    saveToken(json);
                })();
            }
        }, [token]
    );

    return token;
}