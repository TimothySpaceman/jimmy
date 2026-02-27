import type {JimmyNode} from "@/lib/core/types.ts"
import ImageNode from "@/components/preview/nodes/imageNode.tsx";

type Props = {
    node: JimmyNode
}

export default function Node({node}: Props) {
    if (node.type === "image") return <ImageNode node={node}/>
    return <></>
}