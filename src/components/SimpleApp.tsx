"use client";

import { useCallback, useEffect, useState } from "react";

import type { Pokemon } from "@/types";
import * as api from "@/api";

/**
 * Write an app in the most straight-forward way possible.
 */
export default function SimpleApp() {
    const [data, setData] = useState<Pokemon | null>(null);

    const updateData = useCallback(async () => {
        const item = await api.getPokemon();
        setData(item);
    }, [setData]);

    useEffect(() => { updateData(); }, [updateData]);

    return (
        <div>
            <h1>{data?.name}</h1>
            <img alt="" src={data?.picture} />
            {data?.description}
        </div>
    );
}
