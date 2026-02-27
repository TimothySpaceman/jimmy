import type {Config} from "@/lib/core"
import {type MouseEvent, useEffect, useRef, useState, type WheelEvent} from "react";

const SCALE_SENSITIVITY = 1 / 1500;
const DEFAULT_GAP = 25;

type Props = {
    config: Config,
}

export default function Preview({config}: Props) {
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

        const dx = (e.clientX - lastPos.current.x) / scale
        const dy = (e.clientY - lastPos.current.y) / scale

        lastPos.current = {x: e.clientX, y: e.clientY}

        setShift(prev => ({
            x: prev.x + dx,
            y: prev.y + dy
        }));
    }

    const previewStyle = {
        width: `${config.canvas.width}px`,
        height: `${config.canvas.height}px`,
        backgroundColor: config.backgroundColor ?? "black",
        transform: `translate(${shift.x}px, ${shift.y}px) scale(${scale})`,
    }

    return <div
        ref={containerRef}
        className="w-full h-full overflow-hidden flex items-center justify-center bg-zinc-950"
        onWheel={handleWheel}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
    >
        <div
            className="border border-zinc-700 overflow-hidden flex-shrink-0 origin-center"
            style={previewStyle}
        >
            Content
        </div>
    </div>
}