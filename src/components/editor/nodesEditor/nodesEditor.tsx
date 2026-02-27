import {useJimmy} from "@/components/jimmyProvider/jimmyProvider.tsx";
import type {JimmyNode} from "@/lib/core/types.ts";
import NodeEditor from "@/components/editor/nodesEditor/nodeEditor.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ALargeSmall, Image, Plus} from "lucide-react";
import {imagePlaceholder} from "@/lib/core/utils.ts";

export default function NodesEditor() {
    const {config, setConfig} = useJimmy();

    function handleChange(idx: number, updates: Partial<JimmyNode>) {
        setConfig(prev => ({
            ...prev,
            nodes: idx > prev.nodes.length ? prev.nodes : prev.nodes.toSpliced(idx, 1, {
                ...prev.nodes[idx],
                ...updates
            } as JimmyNode)
        }));
    }

    function handleAdd(node: JimmyNode) {
        setConfig(prev => ({
            ...prev,
            nodes: [...prev.nodes, node]
        }));
    }

    function handleMove(idx: number, direction: number) {
        setConfig(prev => {
            const newNodes = [...prev.nodes];
            const targetIndex = idx + direction;

            if (targetIndex < 0 || targetIndex >= prev.nodes.length) return prev;

            [newNodes[idx], newNodes[targetIndex]] = [newNodes[targetIndex], newNodes[idx]];

            return {
                ...prev,
                nodes: newNodes
            }
        })
    }

    function handleRemove(idx: number) {
        setConfig(prev => ({
            ...prev,
            nodes: prev.nodes.toSpliced(idx, 1)
        }))
    }

    return <>
        <div className="flex gap-2 justify-between">
            <h2 className="text-foreground text-bold text-xl font-bold">Nodes</h2>
            <AddNodeButton onPick={handleAdd}/>
        </div>
        <div className="overflow-auto max-h-full space-y-2">
            {config.nodes.map((node, idx) => <NodeEditor
                key={`node-${idx}`}
                node={node}
                onChange={updates => handleChange(idx, updates)}
                onMove={(direction) => handleMove(idx, direction)}
                onRemove={() => handleRemove(idx)}
                first={idx === 0}
                last={idx === config.nodes.length - 1}
            />)}
        </div>
    </>
}

type AddNodeProps = {
    onPick: (node: JimmyNode) => void;
}

function AddNodeButton({onPick}: AddNodeProps) {
    function handleAddText() {
        onPick({
            type: "text",
            size: {
                width: 100,
                height: 100
            },
            position: {},
            content: "Lorem ipsum",
        });
    }

    function handleAddImage() {
        onPick({
            type: "image",
            size: {
                width: 100,
                height: 100
            },
            position: {},
            src: imagePlaceholder
        });
    }

    return <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant="outline" size="icon"> <Plus/> </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={handleAddText}>
                <ALargeSmall className="inline"/> Text
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAddImage}>
                <Image className="inline"/> Image
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}