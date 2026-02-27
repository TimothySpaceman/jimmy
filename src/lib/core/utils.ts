import type {ImageNode, JimmyNode, JimmyNodeType, TextNode} from "@/lib/core/types.ts";
import {defaults, type WithDefaults} from "@/lib/core/defaults";

export function withPx(source: Record<string, number>) {
    return Object.fromEntries(
        Object.entries(source).map(([k, v]) => [k, `${v}px`])
    )
}

export function withDefaults(source: TextNode): WithDefaults<"text">;
export function withDefaults(source: ImageNode): WithDefaults<"image">;
export function withDefaults(source: JimmyNode): WithDefaults<JimmyNodeType>;
export function withDefaults(source: JimmyNode): WithDefaults<JimmyNodeType> {
    return {
        ...defaults[source.type],
        ...source,
    }
}

export function labelTextAlign(value: string) {
    switch (value) {
        case "left":
            return "Left"
        case "center":
            return "Center"
        case "right":
            return "Right"
        case "justify":
            return "Justify"
        default:
            return "UNKNOWN";
    }
}

export function labelVerticalAlign(value: string) {
    switch (value) {
        case "start":
            return "Start"
        case "end":
            return "End"
        case "center":
            return "Center"
        default:
            return "UNKNOWN";
    }
}

export function labelFontStyle(value: string) {
    switch (value) {
        case "normal":
            return "Normal"
        case "italic":
            return "Italic"
        case "oblique":
            return "Oblique"
        default:
            return "UNKNOWN";
    }
}

export function labelFit(value: string) {
    switch (value) {
        case "cover":
            return "Cover"
        case "contain":
            return "Contain"
        case "fill":
            return "Fill"
        case "scale-down":
            return "Scale down"
        case "none":
            return "None"
        default:
            return "UNKNOWN";
    }
}

export const webSafeFonts = [
    "Arial, sans-serif",
    "Arial Black, sans-serif",
    "Verdana, sans-serif",
    "Tahoma, sans-serif",
    "Trebuchet MS, sans-serif",
    "Impact, sans-serif",
    "Helvetica, sans-serif",
    "Times New Roman, serif",
    "Georgia, serif",
    "Garamond, serif",
    "Courier New, monospace",
    "Lucida Console, monospace",
    "Lucida Sans Unicode, sans-serif",
    "Palatino Linotype, serif",
    "Book Antiqua, serif",
    "Comic Sans MS, cursive, sans-serif",
    "Brush Script MT, cursive",
    "Century Gothic, sans-serif",
    "Franklin Gothic Medium, sans-serif",
    "Candara, sans-serif",
    "Calibri, sans-serif",
    "Cambria, serif",
    "Consolas, monospace",
    "Monaco, monospace",
    "Optima, sans-serif",
    "Didot, serif",
    "Rockwell, serif",
    "Futura, sans-serif"
];