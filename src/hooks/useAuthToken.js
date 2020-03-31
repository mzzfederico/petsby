import { useEffect } from "react";
import { resources } from "../api";
import useLocalStorage from "./useLocalStorage";
import ky from "ky";

/** Fetches a new token whenever necessary by calling the lambda */
export default function useAuthToken() {
    const [token, saveToken] = useLocalStorage("petfinder_token", false);

    useEffect(
        () => {
            const now = new Date().getTime();
            if (token === false) {
                (async function () {
                    const data = await ky.get(resources.fetchToken);
                    const json = await data.json();
                    const obtained_at = now;
                    return saveToken({ ...json, obtained_at });
                })();
            }
            /* Forces renewal of token if older than half an hour */
            if ((now - token.obtained_at) > (1800 * 1000)) {
                return saveToken(false);
            }
        }, [token]
    );

    return token;
}