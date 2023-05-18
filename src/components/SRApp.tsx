"use client";

import { useCallback, useEffect, useState } from "react";

import type { Pokemon } from "@/types";
import * as api from "@/api";

/**
 * Introduce Single-Responsibility to the app.
 */
export function useSRAppProps() {
    const [data, setData] = useState<Pokemon | null>(null);

    const updateData = useCallback(async () => {
        const item = await api.getPokemon();
        setData(item);
    }, [setData]);

    useEffect(() => { updateData(); }, [updateData]);

    return { data };
}

export function SRAppView({ data }: ReturnType<typeof useSRAppProps>) {
    return (
        <div>
            <h1>{data?.name}</h1>
            <img alt="" src={data?.picture} />
            {data?.description}
        </div>
    );
}

export default function SRApp() {
    const props = useSRAppProps();
    return (
        <SRAppView {...props} />
    );
}
