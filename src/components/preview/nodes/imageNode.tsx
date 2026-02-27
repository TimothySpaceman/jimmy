import type {ImageNode} from "@/lib/core/types.ts"
import {withDefaults, withPx} from "@/lib/core/utils.ts";

type Props = {
    node: ImageNode
}

export default function ImageNode({node}: Props) {
    const positionStyle = node.position ? withPx(node.position) : {};
    const sizeStyle = node.size ? withPx(node.size) : {};
    const nodeStyle = withDefaults(node);

    const imgStyle = {
        objectFit: nodeStyle.fit,
        ...positionStyle,
        ...sizeStyle,
    }

    return <img
        draggable={false}
        src={node.src}
        alt={`Failed to load ${node.name ?? "image"}`}
        className="absolute block select-none"
        style={imgStyle}
    />
}