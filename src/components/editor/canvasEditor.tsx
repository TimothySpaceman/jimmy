import {useJimmy} from "@/components/jimmyProvider/jimmyProvider.tsx";
import type {ChangeEvent} from "react";
import {Field, FieldGroup, FieldLabel, FieldLegend, FieldSet} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";

export default function CanvasEditor() {
    const {config, setConfig} = useJimmy();

    function handleChange(key: string, value: any) {
        setConfig(prev => ({
            ...prev,
            canvas: {
                ...prev.canvas,
                [key]: value
            },
        }))
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        handleChange(e.target.name, e.target.value)
    }

    return <FieldSet>
        <FieldLegend>Canvas</FieldLegend>
        <FieldGroup className="gap-2">
            <Field className="gap-2" orientation="responsive">
                <FieldLabel htmlFor="canvas.width">Width</FieldLabel>
                <Input
                    id="canvas.width"
                    name="width"
                    type="number"
                    min={1}
                    value={config.canvas.width}
                    onChange={e => handleChange("width", +e.target.value)}
                />
            </Field>
            <Field className="gap-2" orientation="responsive">
                <FieldLabel htmlFor="canvas.height">Height</FieldLabel>
                <Input
                    id="canvas.height"
                    name="height"
                    type="number"
                    min={1}
                    value={config.canvas.height}
                    onChange={e => handleChange("height", +e.target.value)}
                />
            </Field>
            <Field className="gap-2" orientation="responsive">
                <FieldLabel htmlFor="canvas.background">Background</FieldLabel>
                <Input
                    className="min-w-20"
                    id="canvas.background"
                    name="background"
                    type="color"
                    value={config.canvas.background}
                    onChange={handleInputChange}
                />
            </Field>
        </FieldGroup>
    </FieldSet>
}