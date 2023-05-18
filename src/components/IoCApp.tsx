"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import type { Client, Pokemon } from "@/types";
import * as api from "@/api";

/**
 * Introduce inversion of control to the app.
 */
export const ApiContext = createContext<Client | null>(null);

function useApi(): Client {
    const apiClient = useContext(ApiContext);

    if (apiClient === null) {
        throw new Error("API Client is not defined.");
    }

    return apiClient;
}

export function useIoCAppProps() {
    const apiClient = useApi();
    const [data, setData] = useState<Pokemon | null>(null);

    const updateData = useCallback(async () => {
        const item = await apiClient.getPokemon();
        setData(item);
    }, [setData]);

    useEffect(() => { updateData(); }, [updateData]);

    return { data };
}

export function IoCAppView({ data }: ReturnType<typeof useIoCAppProps>) {
    return (
        <div>
            <h1>{data?.name}</h1>
            <img alt="" src={data?.picture} />
            {data?.description}
        </div>
    );
}

function IoCApp() {
    const props = useIoCAppProps();
    return (
        <IoCAppView {...props} />
    );
}

export default function AppWrapper() {
    return (
        <ApiContext.Provider value={api}>
            <IoCApp />
        </ApiContext.Provider>
    );
}
