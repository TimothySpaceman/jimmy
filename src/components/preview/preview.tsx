import {type MouseEvent, useEffect, useRef, useState, type WheelEvent} from "react";
import Node from "@/components/preview/nodes/node.tsx"
import {useJimmy} from "@/components/jimmyProvider/jimmyProvider.tsx";

const SCALE_SENSITIVITY = 1 / 1500;
const DEFAULT_GAP = 25;

export default function Preview() {
    const {config} = useJimmy();

    const containerRef = useRef<HTMLDivElement>(null)

    const [scale, setScale] = useState(1);
    const [shift, setShift] = useState({x: 0, y: 0});
    const lastPos = useRef<{ x: number; y: number } | null>(null)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const containerWidth = el.clientWidth
        const containerHeight = el.clientHeight

        const scaleX = (containerWidth - DEFAULT_GAP * 2) / config.canvas.width
        const scaleY = (containerHeight - DEFAULT_GAP * 2) / config.canvas.height

        const initialScale = Math.min(scaleX, scaleY)

        setScale(initialScale)
    }, [])

    function handleWheel(e: WheelEvent<HTMLDivElement>) {
        const multiplier = 1 - e.deltaY * SCALE_SENSITIVITY;
        setScale(prev => prev * multiplier)
    }

    function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
        if (e.button !== 0) return
        lastPos.current = {x: e.clientX, y: e.clientY}
    }

    function handleMouseUp() {
        lastPos.current = null
    }

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (e.buttons !== 1 || !lastPos.current) return;

        const dx = e.clientX - lastPos.current.x
        const dy = e.clientY - lastPos.current.y

        lastPos.current = {x: e.clientX, y: e.clientY}

        setShift(prev => ({
            x: prev.x + dx,
            y: prev.y + dy
        }));
    }

    const previewStyle = {
        width: `${config.canvas.width}px`,
        height: `${config.canvas.height}px`,
        backgroundColor: config.canvas.background,
        transform: `translate(${shift.x}px, ${shift.y}px) scale(${scale})`,
    }

    return <div
        ref={containerRef}
        className="w-full h-full overflow-hidden flex items-center justify-center bg-background"
        onWheel={handleWheel}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
    >
        <div
            className="relative box-content overflow-hidden flex-shrink-0 origin-center"
            style={previewStyle}
        >
            {config.nodes.map(node => <Node node={node} key={btoa(JSON.stringify(node))}/>)}
        </div>
    </div>
}