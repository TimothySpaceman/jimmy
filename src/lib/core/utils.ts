import type {ImageNode, JimmyNode, JimmyNodeType, TextNode} from "@/lib/core/types.ts";
import {defaults, type WithDefaults} from "@/lib/core/defaults";

export function withPx(source: Record<string, number>) {
    return Object.fromEntries(
        Object.entries(source).map(([k, v]) => [k, `${v}px`])
    )
}

export function withDefaults(source: TextNode): WithDefaults<"text">;
export function withDefaults(source: ImageNode): WithDefaults<"image">;
export function withDefaults(source: JimmyNode): WithDefaults<JimmyNodeType> {
    return {
        ...defaults[source.type],
        ...source,
    }
}