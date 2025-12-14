
import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60 * 5,
        },
    },
})

export const localStoragePersister = typeof window !== 'undefined' 
    ? createAsyncStoragePersister({
            storage: {
                getItem: async (key: string) => {
                    return window.localStorage.getItem(key) ?? null;
                },
                setItem: async (key: string, value: string) => {
                    window.localStorage.setItem(key, value);
                },
                removeItem: async (key: string) => {
                    window.localStorage.removeItem(key);
                },
            },
        })
    : undefined;