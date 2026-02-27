import type {JimmyConfig} from "@/lib/core/types.ts";
import {createContext, type Dispatch, type PropsWithChildren, type SetStateAction, useContext, useState} from "react";
import {defaultConfig} from "@/lib/core/defaults.ts";

type JimmyContext = {
    config: JimmyConfig,
    setConfig: Dispatch<SetStateAction<JimmyConfig>>
}

const JimmyContext = createContext<JimmyContext | undefined>(undefined)

type JimmyProviderProps = PropsWithChildren & {
    initialConfig?: JimmyConfig,
}

export function JimmyProvider({initialConfig = defaultConfig, children}: JimmyProviderProps) {
    const [config, setConfig] = useState<JimmyConfig>(initialConfig)

    const value = {config, setConfig};
    return <JimmyContext.Provider value={value}>
        {children}
    </JimmyContext.Provider>
}

export function useJimmy() {
    const ctx = useContext(JimmyContext);
    if (!ctx) throw new Error("useJimmy must be inside JimmyProvider");
    return ctx;
}