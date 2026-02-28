import MetadataEditor from "@/components/editor/metadataEditor.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import CanvasEditor from "./canvasEditor";
import NodesEditor from "@/components/editor/nodesEditor/nodesEditor.tsx";
import UpDownLoad from "@/components/editor/upDownLoad.tsx";
import {useState} from "react";
import CodeEditor from "@/components/editor/codeEditor.tsx";


export default function Editor() {
    const [isMonaco, setIsMonaco] = useState(true);

    if(isMonaco){
        return <CodeEditor/>
    }

    return <div className="px-3 py-2 w-full h-full flex flex-col gap-2 bg-background">
        <div className="flex gap-1">
            <MetadataEditor/>
            <UpDownLoad/>
        </div>
        <Separator/>
        <CanvasEditor/>
        <Separator/>
        <NodesEditor/>
    </div>
}