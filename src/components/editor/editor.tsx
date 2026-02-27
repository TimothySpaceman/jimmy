import MetadataEditor from "@/components/editor/metadataEditor.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import CanvasEditor from "./canvasEditor";
import NodesEditor from "@/components/editor/nodesEditor/nodesEditor.tsx";

export default function Editor() {
    return <div className="px-3 py-2 w-full h-full flex flex-col gap-2 bg-background">
        <MetadataEditor/>
        <Separator/>
        <CanvasEditor/>
        <Separator/>
        <NodesEditor/>
    </div>
}