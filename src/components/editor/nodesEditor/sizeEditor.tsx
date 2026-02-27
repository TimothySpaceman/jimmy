import type {BasicNode} from "@/lib/core/types.ts";
import {type ChangeEvent, useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {Field, FieldGroup, FieldLabel, FieldLegend, FieldSet} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";

type Props = {
    node: BasicNode,
    onChange: (updates: Partial<BasicNode>) => void,
}

export default function SizeEditor({node, onChange}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange({
            size: {
                ...node.size,
                [e.target.name]: e.target.value
            }
        })
    }

    const Icon = isOpen ? ChevronUp : ChevronDown;

    return <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
    >
        <FieldSet className="gap-0">
            <CollapsibleTrigger className="text-left">
                <FieldLegend>
                    <Icon className="inline"/> Size
                </FieldLegend>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <FieldGroup className="gap-1">
                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor="node.size.width">Width</FieldLabel>
                        <Input
                            id="node.size.width"
                            name="width"
                            type="number"
                            min={1}
                            value={node.size.width}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor="node.size.height">Height</FieldLabel>
                        <Input
                            id="node.size.height"
                            name="height"
                            type="number"
                            min={1}
                            value={node.size.height}
                            onChange={handleChange}
                        />
                    </Field>
                </FieldGroup>
            </CollapsibleContent>
        </FieldSet>
    </Collapsible>
}