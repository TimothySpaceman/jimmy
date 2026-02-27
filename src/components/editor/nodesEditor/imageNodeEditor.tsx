import type {ImageNode} from "@/lib/core/types.ts";

type Props = {
    node: ImageNode,
    onChange: (updates: Partial<ImageNode>) => void,
}

export default function ImageNodeEditor({node, onChange}: Props) {
    return <div>Image node editor</div>
}