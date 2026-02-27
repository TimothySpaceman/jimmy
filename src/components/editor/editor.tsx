import MetadataEditor from "@/components/editor/metadataEditor.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import CanvasEditor from "./canvasEditor";

export default function Editor() {
    return <div className="px-3 py-2 w-full h-full bg-background">
        <MetadataEditor/>
        <Separator className="my-2"/>
        <CanvasEditor/>
    </div>
}