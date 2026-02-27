import {useJimmy} from "@/components/jimmyProvider/jimmyProvider.tsx";
import type {JimmyNode} from "@/lib/core/types.ts";
import NodeEditor from "@/components/editor/nodesEditor/nodeEditor.tsx";

export default function NodesEditor() {
    const {config, setConfig} = useJimmy();

    function handleNodeChange(idx: number, updates: Partial<JimmyNode>) {
        setConfig(prev => ({
            ...prev,
            nodes: idx > prev.nodes.length ? prev.nodes : prev.nodes.toSpliced(idx, 1, {
                ...prev.nodes[idx]!,
                ...updates
            } as JimmyNode)
        }));
    }

    return <>
        <h2 className="text-foreground text-bold text-xl font-bold">Nodes</h2>
        <div className="overflow-auto max-h-full space-y-2">
            {config.nodes.map((node, idx) => <NodeEditor
                key={`node-${idx}`}
                node={node}
                onChange={updates => handleNodeChange(idx, updates)}
            />)}
        </div>
    </>
}