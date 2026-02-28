import type {TextNode} from "@/lib/core/types.ts"
import {withDefaults, withPx} from "@/lib/core/utils.ts";

type Props = {
    node: TextNode
}

export default function TextNode({node}: Props) {
    const {verticalAlign, fontSize, position, size, ...nodeStyle} = withDefaults(node);
    const positionStyle = position ? withPx(position) : {};
    const sizeStyle = size ? withPx(size) : {};

    const spanStyle = {
        ...nodeStyle,
        fontSize: `${fontSize}px`,
        width: "100%",
        height: "100$",
        display: "block"
    }

    const divStyle = {
        alignItems: verticalAlign,
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