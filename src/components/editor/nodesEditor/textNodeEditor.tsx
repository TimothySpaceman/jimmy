import type {TextNode} from "@/lib/core/types.ts";

type Props = {
    node: TextNode,
    onChange: (updates: Partial<TextNode>) => void,
}

export default function TextNodeEditor({node, onChange}: Props) {
    return <div>Text node editor</div>
}