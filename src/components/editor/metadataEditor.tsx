import {useJimmy} from "@/components/jimmyProvider/jimmyProvider.tsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Save} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

export default function MetadataEditor() {
    const {config, setConfig} = useJimmy()
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(config.title);
    const [description, setDescription] = useState(config.description);

    function handleSave() {
        setConfig(prev => ({
            ...prev,
            title: title.trim() || prev.title,
            description: description?.trim() || prev.description,
        }));
        setEditing(false)
    }

    useEffect(() => {
        setTitle(config.title);
        setDescription(config.description);
    }, [config]);

    if (!editing) {
        return <div className="flex flex-col gap-2 grow-1">
            <div className="flex justify-between gap-2">
                <h1 className="text-foreground text-2xl font-bold">
                    {config.title}
                </h1>
                <Button variant="outline" onClick={() => setEditing(true)} size="icon">
                    <Pencil/>
                </Button>
            </div>
            {config.description && <p className="text-secondary-foreground">
                {config.description}
            </p>}
        </div>
    }

    return <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
            <Input
                placeholder="Title"
                minLength={1}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Button variant="outline" onClick={handleSave} size="icon">
                <Save/>
            </Button>
        </div>
        <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    </div>
}