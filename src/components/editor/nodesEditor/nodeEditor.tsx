import type {JimmyNode} from "@/lib/core/types.ts";
import TextNodeEditor from "@/components/editor/nodesEditor/textNodeEditor.tsx";
import {Card} from "@/components/ui/card.tsx";
import SizeEditor from "@/components/editor/nodesEditor/sizeEditor";
import PositionEditor from "@/components/editor/nodesEditor/positionEditor.tsx";
import ImageNodeEditor from "./imageNodeEditor";
import {withDefaults} from "@/lib/core/utils.ts";
import type {WithDefaults} from "@/lib/core/defaults.ts";

type Props = {
    node: JimmyNode,
    onChange: (updates: Partial<JimmyNode>) => void,
}

export default function NodeEditor({node, onChange}: Props) {
    const fullNode = withDefaults(node);

    return <Card className="p-3 gap-2">
        <div className="flex justify-end">
            <span className="text-foreground/50">{node.type}</span>
        </div>
        <SizeEditor node={node} onChange={onChange}/>
        <PositionEditor node={node} onChange={onChange}/>

        {node.type === "text" && (
            <TextNodeEditor
                node={fullNode as WithDefaults<"text">}
                onChange={onChange}
            />
        )}

        {node.type === "image" && (
            <ImageNodeEditor
                node={fullNode as WithDefaults<"image">}
                onChange={onChange}
            />
        )}
    </Card>
}