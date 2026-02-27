import type {TextNode} from "@/lib/core/types.ts"
import {withPx} from "@/lib/core/utils.ts";

type Props = {
    node: TextNode
}

export default function TextNode({node}: Props) {
    const positionStyle = node.position ? withPx(node.position) : {};
    const sizeStyle = node.size ? withPx(node.size) : {};

    const spanStyle = {
        color: node.color ?? "white",
        textAlign: node.textAlign ?? "center",
        fontFamily: node.fontFamily ?? "Trebuchet MS, sans-serif",
        fontSize: `${node.fontSize ?? 18}px`,
        fontWeight: `${node.fontWeight ?? "normal"}`,
        fontStyle: node.fontStyle ?? "normal"
    }

    const divStyle = {
        alignItems: node.verticalAlign ?? "center",
        ...positionStyle,
        ...sizeStyle,
    }

    return <div
        draggable={false}
        className="absolute flex select-none"
        style={divStyle}
    >
        <span style={spanStyle}>{node.content}</span>
    </div>
}