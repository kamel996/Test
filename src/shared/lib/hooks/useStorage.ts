import React, { useCallback, useState, useEffect } from "react";

type StorageType = "localStorage" | "sessionStorage";

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>, () => void] {
    return useStorage<T>(key, defaultValue, "localStorage");
}

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>, () => void] {
    return useStorage<T>(key, defaultValue, "sessionStorage");
}

function useStorage<T>(key: string, defaultValue: T | (() => T), storageType: StorageType): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>, () => void] {
    const storageObject = storageType === "localStorage" ? window.localStorage : window.sessionStorage;

    const [value, setValue] = useState<T | undefined>(() => {
        const jsonValue = storageObject.getItem(key);
        if (jsonValue !== null) {
            return JSON.parse(jsonValue);
        }

        if (typeof defaultValue === "function") {
            return (defaultValue as () => T)();
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (value === undefined) {
            storageObject.removeItem(key);
        } else {
            storageObject.setItem(key, JSON.stringify(value));
        }
    }, [key, value, storageObject]);

    const remove = useCallback(() => {
        setValue(undefined);
    }, []);

    return [value, setValue, remove];
}
