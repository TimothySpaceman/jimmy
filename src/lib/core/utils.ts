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

export const imagePlaceholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAxMjAgMTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNFRkYxRjMiLz4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzMuMjUwMyAzOC40ODE2QzMzLjI2MDMgMzcuMDQ3MiAzNC40MTk5IDM1Ljg4NjQgMzUuODU0MyAzNS44NzVIODMuMTQ2M0M4NC41ODQ4IDM1Ljg3NSA4NS43NTAzIDM3LjA0MzEgODUuNzUwMyAzOC40ODE2VjgwLjUxODRDODUuNzQwMyA4MS45NTI4IDg0LjU4MDcgODMuMTEzNiA4My4xNDYzIDgzLjEyNUgzNS44NTQzQzM0LjQxNTggODMuMTIzNiAzMy4yNTAzIDgxLjk1NyAzMy4yNTAzIDgwLjUxODRWMzguNDgxNlpNODAuNTAwNiA0MS4xMjUxSDM4LjUwMDZWNzcuODc1MUw2Mi44OTIxIDUzLjQ3ODNDNjMuOTE3MiA1Mi40NTM2IDY1LjU3ODggNTIuNDUzNiA2Ni42MDM5IDUzLjQ3ODNMODAuNTAwNiA2Ny40MDEzVjQxLjEyNTFaTTQzLjc1IDUxLjYyNDlDNDMuNzUgNTQuNTI0NCA0Ni4xMDA1IDU2Ljg3NDkgNDkgNTYuODc0OUM1MS44OTk1IDU2Ljg3NDkgNTQuMjUgNTQuNTI0NCA1NC4yNSA1MS42MjQ5QzU0LjI1IDQ4LjcyNTQgNTEuODk5NSA0Ni4zNzQ5IDQ5IDQ2LjM3NDlDNDYuMTAwNSA0Ni4zNzQ5IDQzLjc1IDQ4LjcyNTQgNDMuNzUgNTEuNjI0OVoiIGZpbGw9IiM2ODc3ODciLz4NCjwvc3ZnPg=="