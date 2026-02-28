import type {TextNode} from "@/lib/core/types.ts";
import {Field, FieldGroup, FieldLabel, FieldLegend, FieldSet} from "@/components/ui/field.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import type {WithDefaults} from "@/lib/core/defaults.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {labelFontStyle, labelTextAlign, labelVerticalAlign, webSafeFonts} from "@/lib/core/utils.ts";
import {type ChangeEvent, useState} from "react";
import {GracefulCombobox} from "@/components/ui/gracefulCombobox.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";

type Props = {
    node: WithDefaults<"text">,
    onChange: (updates: Partial<TextNode>) => void,
}

export default function TextNodeEditor({node, onChange}: Props) {
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
                    <Icon className="inline"/> Text
                </FieldLegend>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <FieldGroup className="gap-2">
                    <Field className="gap-2">
                        <FieldLabel htmlFor={`${id}-content`}>Content</FieldLabel>
                        <Textarea
                            id={`${id}-content`}
                            name="content"
                            value={node.content}
                            onChange={handleInputChange}
                        />
                    </Field>

                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor={`${id}-color`}>Color</FieldLabel>
                        <Input
                            className="min-w-20"
                            id={`${id}-color`}
                            name="color"
                            type="color"
                            value={node.color}
                            onChange={handleInputChange}
                        />
                    </Field>

                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor={`${id}-textAlign`}>Align text</FieldLabel>
                        <Select
                            value={node.textAlign}
                            onValueChange={value => handleChange("textAlign", value)}
                        >
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {["left", "center", "right", "justify"].map(a => <SelectItem
                                    key={`textAlign-${a}`}
                                    value={a}
                                >
                                    {labelTextAlign(a)}
                                </SelectItem>)}
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor={`${id}-verticalAlign`}>Align vertically</FieldLabel>
                        <Select
                            value={node.verticalAlign}
                            onValueChange={value => handleChange("verticalAlign", value)}
                        >
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {["start", "center", "end"].map(a => <SelectItem
                                    key={`verticalAlign-${a}`}
                                    value={a}
                                >
                                    {labelVerticalAlign(a)}
                                </SelectItem>)}
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor={`${id}-fontFamily`}>Font Family</FieldLabel>
                        <GracefulCombobox
                            value={node.fontFamily}
                            onChange={value => handleChange("fontFamily", value)}
                            placeholder="Search or custom"
                            options={webSafeFonts}
                        />
                    </Field>
                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor={`${id}-fontSize`}>Font size</FieldLabel>
                        <Input
                            className="min-w-20"
                            id={`${id}-fontSize`}
                            name="fontSize"
                            type="number"
                            min={1}
                            value={node.fontSize}
                            onChange={e => handleChange("fontSize", +e.target.value)}
                        />
                    </Field>
                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor={`${id}-fontWeight`}>Font weight</FieldLabel>
                        <Select
                            value={`${node.fontWeight}`}
                            onValueChange={value => handleChange("fontWeight", +value)}
                        >
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(w => <SelectItem
                                    key={`fontStyle-${w}`}
                                    value={`${w}`}
                                >
                                    {w}
                                </SelectItem>)}
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="gap-2" orientation="responsive">
                        <FieldLabel htmlFor={`${id}-fontStyle`}>Font style</FieldLabel>
                        <Select
                            value={node.fontStyle}
                            onValueChange={value => handleChange("fontStyle", value)}
                        >
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {["normal", "italic", "oblique"].map(a => <SelectItem
                                    key={`${a}fontStyle-`}
                                    value={a}
                                >
                                    {labelFontStyle(a)}
                                </SelectItem>)}
                            </SelectContent>
                        </Select>
                    </Field>
                </FieldGroup>
            </CollapsibleContent>
        </FieldSet>
    </Collapsible>
}