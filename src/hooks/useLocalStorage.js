// https://usehooks.com/useLocalStorage/
import React, { useState } from "react";

/** Stores and recovers data from localStorage - so menial that I usually use this one by copy and paste: https://usehooks.com/useLocalStorage/ */
export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });
    const setValue = value => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            //console.log(error);
        }
    };

    return [storedValue, setValue];
}