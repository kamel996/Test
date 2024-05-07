export type StorageType = "LOCAL" | "SESSION"

export const getStorage = (type: StorageType): Storage => {
    if (type === "SESSION") {
        return window.sessionStorage;
    }
    return window.localStorage;
};

const setItem = (type: StorageType) => (key: string, value: any) => {
    getStorage(type).setItem(key, JSON.stringify(value));
};

const getItem = (type: StorageType) => (key: string, defaultVal?: any) => {
    const val = getStorage(type).getItem(key);
    if (!val || val === 'undefined') return defaultVal;
    try {
        return JSON.parse(val);
    } catch (e) {
        return val;
    }
};

const removeItem = (type: StorageType) => (key: string) => {
    getStorage(type).removeItem(key);
};

export type getItemType = (key: string, defaultVal?: any) => any;
export type setItemType = (key: string, value: any) => void;
export type removeItemType = (key: string) => void;

export interface IStorageAPI {
    get: getItemType;
    set: setItemType;
    remove: removeItemType;
}

export interface IStorageService {
    session: IStorageAPI;
    local: IStorageAPI;
}

export const Storage: IStorageService = {
    session: {
        get: getItem("SESSION"),
        set: setItem("SESSION"),
        remove: removeItem("SESSION"),
    },
    local: {
        get: getItem("LOCAL"),
        set: setItem("LOCAL"),
        remove: removeItem("LOCAL"),
    },
};
