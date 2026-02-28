import {type MouseEvent, useEffect, useRef, useState, type WheelEvent} from "react";
import {useJimmy} from "@/components/jimmyProvider/jimmyProvider.tsx";
import PreviewCanvas from "@/components/preview/previewCanvas.tsx";

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

    const canvasStyle = {
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
        <PreviewCanvas config={config} style={canvasStyle} className="flex-shrink-0 origin-center"/>
    </div>
}