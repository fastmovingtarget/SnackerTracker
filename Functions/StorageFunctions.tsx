//2025-08-28 : Added a clearStorage function for testing, removed error flag when empty
//2025-08-23 : Removed console log
//2025-08-19 : Storage functions for accessing local storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import type TrackerDay from '../Types/TrackerDay';
import Storage from 'react-native-storage';

const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
});

export const writeToStorage = async (key: string, data: TrackerDay[]) => {
    try {
        await storage.save({
            key: key, // The key for the data
            data: data, // The data to be stored
            expires: null // No expiration time
        });
    } catch (e) {
        console.error("Error writing to storage:", e);
    }
}

export const readFromStorage = async (key: string) => {

    const resultPromise = new Promise((resolve, reject) => {
        storage.load({
            key: key, // The key for the data
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            resolve(null); // Return null if there's an error
        });
    })
    return resultPromise;
}

export const clearStorage = async (key: string) => {
    try {
        await storage.remove({
            key: key, // The key for the data
        });
    } catch (e) {
        console.error("Error clearing storage:", e);
    }
}