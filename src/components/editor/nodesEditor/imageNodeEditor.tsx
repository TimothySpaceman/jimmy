import {Field, FieldGroup, FieldLabel, FieldLegend, FieldSet} from "@/components/ui/field.tsx";
import {ChevronDown, ChevronUp, FileUp} from "lucide-react";
import type {WithDefaults} from "@/lib/core/defaults.ts";
import {type ChangeEvent, useRef, useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {labelFit} from "@/lib/core/utils.ts";
import {Button} from "@/components/ui/button";
import type {ImageNode} from "@/lib/core/types.ts";

type Props = {
    node: WithDefaults<"image">,
    onChange: (updates: Partial<ImageNode>) => void,
}

export default function ImageNodeEditor({node, onChange}: Props) {
    const id = crypto.randomUUID();
    const [isOpen, setIsOpen] = useState(false);

    function handleChange(key: string, value: any) {
        onChange({
            [key]: value
        })
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        handleChange(e.target.name, e.target.value)
    }

    const Icon = isOpen ? ChevronUp : ChevronDown;

    return <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
    >
        <FieldSet className="gap-0">
            <CollapsibleTrigger className="text-left">
                <FieldLegend>
                    <Icon className="inline"/> Image
                </FieldLegend>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <FieldGroup className="gap-2">
                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor={`${id}-src`}>Source</FieldLabel>
                        <div className="flex gap-1">
                            <Input
                                className="min-w-20"
                                id={`${id}-src`}
                                name="src"
                                type="text"
                                value={node.src}
                                onChange={handleInputChange}
                            />
                            <FileUploadButton onChange={value => handleChange("src", value)}/>
                        </div>
                    </Field>

                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor={`${id}-fit`}>Fit</FieldLabel>
                        <Select
                            value={node.fit}
                            onValueChange={value => handleChange("fit", value)}
                        >
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {["cover", "contain", "fill", "scale-down", "none"].map(a => <SelectItem
                                    key={`fit-${a}`}
                                    value={a}
                                >
                                    {labelFit(a)}
                                </SelectItem>)}
                            </SelectContent>
                        </Select>
                    </Field>
                </FieldGroup>
            </CollapsibleContent>
        </FieldSet>
    </Collapsible>
}

type FileUploadProps = {
    onChange: (value: string) => void,
}

const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/bmp",
    "image/tiff",
    "image/svg+xml",
    "image/heic",
    "image/heif"
]

function FileUploadButton({onChange}: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!allowedImageTypes.includes(file.type)) {
            alert("Animated or unsupported image format not allowed.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            console.log(result.length)
            onChange(result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <input
                type="file"
                ref={inputRef}
                onChange={handleChange}
                className="hidden"
                accept={allowedImageTypes.join(", ")}
            />
            <Button onClick={handleClick} variant="outline">
                <FileUp/>
            </Button>
        </>
    );
}