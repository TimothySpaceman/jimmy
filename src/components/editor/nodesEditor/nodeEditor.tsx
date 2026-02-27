import type {JimmyNode} from "@/lib/core/types.ts";
import TextNodeEditor from "@/components/editor/nodesEditor/textNodeEditor.tsx";
import {Card} from "@/components/ui/card.tsx";
import SizeEditor from "@/components/editor/nodesEditor/sizeEditor";
import PositionEditor from "@/components/editor/nodesEditor/positionEditor.tsx";
import ImageNodeEditor from "@/components/editor/nodesEditor/imageNodeEditor";
import {withDefaults} from "@/lib/core/utils.ts";
import type {WithDefaults} from "@/lib/core/defaults.ts";
import NameEditor from "@/components/editor/nodesEditor/nameEditor";
import {ArrowDown, ArrowUp, Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    node: JimmyNode,
    onChange: (updates: Partial<JimmyNode>) => void,
    onMove: (direction: number) => void
    onRemove: () => void;
    first?: boolean;
    last?: boolean;
}

export default function NodeEditor({node, onChange, onMove, onRemove, first, last}: Props) {
    const fullNode = withDefaults(node);

    return <Card className="p-3 gap-2">
        <div className="flex items-center gap-3 mb-1">
            <NameEditor className="font-bold" node={node} onChange={onChange}/>
            <span className="ml-auto text-foreground/50">{node.type}</span>
            <div className="flex gap-1">
                <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => onMove(-1)}
                    disabled={first}
                >
                    <ArrowUp/>
                </Button>
                <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => onMove(1)}
                    disabled={last}
                >
                    <ArrowDown/>
                </Button>
                <Button
                    variant="destructive"
                    size="icon-sm"
                    onClick={onRemove}
                >
                    <Trash/>
                </Button>
            </div>
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