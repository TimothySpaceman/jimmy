import type {JimmyConfig} from "@/lib/core/types"
import Node from "@/components/preview/nodes/node.tsx";
import {cn} from "@/lib/utils.ts";
import type {RefObject} from "react";

type Props = {
    ref?: RefObject<HTMLDivElement | null>
    config: JimmyConfig
    style?: Record<string, any>
    className?: string
}

export default function PreviewCanvas({config, ref, className, style = {}}: Props) {
    const previewStyle = {
        width: `${config.canvas.width}px`,
        height: `${config.canvas.height}px`,
        backgroundColor: config.canvas.background,
        ...style
    }

    return <div
        ref={ref}
        className={cn("relative box-content overflow-hidden", className)}
        style={previewStyle}
    >
        {config.nodes.map(node => <Node node={node} key={btoa(JSON.stringify(node))}/>)}
    </div>
}