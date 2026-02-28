import {useEffect, useRef} from "react";
import {useJimmy} from "@/components/jimmyProvider/jimmyProvider.tsx";
import {throttle, useQueryState} from "nuqs";
import LZString from "lz-string";

function encode(obj: unknown) {
    return LZString.compressToEncodedURIComponent(JSON.stringify(obj));
}

function decode(str: string | null) {
    if (!str) return null;
    const json = LZString.decompressFromEncodedURIComponent(str);
    return json ? JSON.parse(json) : null;
}

export default function UrlConfig() {
    const {config, setConfig} = useJimmy();
    const [urlState, setUrlState] = useQueryState("config");

    const isHydrated = useRef(false);

    useEffect(() => {
        if (isHydrated.current) return;

        const decoded = decode(urlState);
        if (decoded) setConfig(decoded);

        isHydrated.current = true;
    }, [urlState, setConfig]);

    useEffect(() => {
        if (!isHydrated.current) return;

        const encoded = encode(config);

        setUrlState(encoded, {history: "replace", limitUrlUpdates: throttle(500)});
    }, [config, setUrlState]);

    return null;
}