import type {ImageNode} from "@/lib/core/types.ts";
import type {WithDefaults} from "@/lib/core/defaults.ts";

type Props = {
    node: WithDefaults<"image">
    onChange: (updates: Partial<ImageNode>) => void,
}

export default function ImageNodeEditor({node, onChange}: Props) {
    return <div>Image node editor</div>
}