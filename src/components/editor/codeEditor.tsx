import MonacoEditor from '@monaco-editor/react';
import {useJimmy} from "@/components/jimmyProvider/jimmyProvider.tsx";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {z, type ZodIssue} from "zod";
import {type JimmyConfig, jimmyConfigSchema} from "@/lib/core/types.ts";
import isEqual from "lodash.isequal";

const format = (config: any) => JSON.stringify(config, null, 2)

export default function CodeEditor() {
    const {config, setConfig} = useJimmy()
    const [draft, setDraft] = useState(format(config))
    const [debounceDraft, setDebounceDraft] = useDebounce(draft, 200)
    const [errors, setErrors] = useState<ZodIssue[]>([]);

    useEffect(() => {
        try {
            const parsed = JSON.parse(draft);
            if (isEqual(config, parsed)) return;

            const formatted = format(config);
            setDraft(formatted);
            setDebounceDraft(formatted);
        } catch (e) {
        }
    }, [config]);

    useEffect(() => {
        try {
            const parsed = JSON.parse(debounceDraft);
            const validated = z.safeParse(jimmyConfigSchema, parsed);
            if (!validated.success) {
                setErrors(validated.error.issues)
                return;
            }
            setErrors([]);
            if (isEqual(config, parsed)) return;
            setConfig(validated.data as JimmyConfig);
        } catch (e) {
            setErrors([{
                code: "custom",
                message: "Invalid JSON",
                path: []
            }]);
        }
    }, [debounceDraft])

    return <div className="h-screen flex flex-col">
        {errors.length > 0 && <div className="bg-destructive text-foreground p-1">
            {errors.map(e => <div>
                <p>{e.message}</p>
                <p className="opacity-75">{e.path.join(".")}</p>
            </div>)}
        </div>}
        <MonacoEditor
            className="h-full"
            theme="vs-dark"
            defaultLanguage="json"
            value={draft}
            onChange={value => setDraft(value ?? "")}
        />
    </div>;
}