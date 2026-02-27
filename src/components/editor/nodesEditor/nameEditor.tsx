import {type KeyboardEvent, useEffect, useRef, useState} from "react";
import type {BasicNode} from "@/lib/core/types.ts";
import {Input} from "@/components/ui/input.tsx";

type Props = {
    node: BasicNode,
    onChange: (updates: Partial<BasicNode>) => void,
    className?: string
}

export default function NameEditor({node, onChange, className}: Props) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [draft, setDraft] = useState(node.name);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    function finishEditing() {
        setIsEditing(false);
        if (draft !== node.name) {
            onChange({
                name: draft?.trim()
            });
        }
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            finishEditing();
        }
        if (e.key === "Escape") {
            setDraft(node.name);
            setIsEditing(false);
        }
    }

    if (isEditing) {
        return (
            <Input
                className="w-full"
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={finishEditing}
                onKeyDown={handleKeyDown}
            />
        );
    }

    return (
        <span
            onClick={() => setIsEditing(true)}
            className={className}
            style={{cursor: "pointer"}}
        >
        {node.name?.trim() ?? "Unnamed node"}
    </span>
    );
}