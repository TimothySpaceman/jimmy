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

export default function PositionEditor({node, onChange}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.length > 0 ? +e.target.value : undefined;
        onChange({
            position: {
                ...node.position,
                [e.target.name]: value
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
                    <Icon className="inline"/> Position
                </FieldLegend>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <FieldGroup className="gap-1">
                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor="node.position.top">Top</FieldLabel>
                        <Input
                            id="node.position.top"
                            name="top"
                            type="number"
                            value={node.position?.top ?? ""}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor="node.position.bottom">Bottom</FieldLabel>
                        <Input
                            id="node.position.bottom"
                            name="bottom"
                            type="number"
                            value={node.position?.bottom ?? ""}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor="node.position.left">Left</FieldLabel>
                        <Input
                            id="node.position.left"
                            name="left"
                            type="number"
                            value={node.position?.left ?? ""}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor="node.position.right">Right</FieldLabel>
                        <Input
                            id="node.position.right"
                            name="right"
                            type="number"
                            value={node.position?.right ?? ""}
                            onChange={handleChange}
                        />
                    </Field>
                </FieldGroup>
            </CollapsibleContent>
        </FieldSet>
    </Collapsible>
}