import MetadataEditor from "@/components/editor/metadataEditor.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import CanvasEditor from "./canvasEditor";
import NodesEditor from "@/components/editor/nodesEditor/nodesEditor.tsx";
import UpDownLoad from "@/components/editor/upDownLoad.tsx";
import {useState} from "react";
import CodeEditor from "@/components/editor/codeEditor.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FileBraces, SlidersHorizontal} from "lucide-react";


export default function Editor() {
    const [isMonaco, setIsMonaco] = useState(true);

    const SwitcherIcon = isMonaco ? SlidersHorizontal : FileBraces;

    return <div className="relative w-full h-full flex flex-col bg-background">
        <div className="px-3 py-2 flex gap-1">
            <MetadataEditor editable={!isMonaco}/>
            <UpDownLoad/>
            <Button
                size="icon"
                variant="outline"
                onClick={() => {
                    setIsMonaco(prev => !prev)
                }}
            >
                <SwitcherIcon/>
            </Button>
        </div>
        {isMonaco && <CodeEditor/>}
        {!isMonaco && <InteractiveEditor/>}
    </div>
}

function InteractiveEditor() {
    return <div className="px-3 py-2 flex flex-col gap-2">
        <Separator/>
        <CanvasEditor/>
        <Separator/>
        <NodesEditor/>
    </div>
}