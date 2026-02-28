import {useRef} from "react";
import PreviewCanvas from "@/components/preview/previewCanvas.tsx";
import {Button} from "../ui/button";
import {FileImage} from "lucide-react";
import * as htmlToImage from 'html-to-image';
import {useJimmy} from "@/components/jimmyProvider/jimmyProvider.tsx";

type Props = {
    className?: string
}

export default function Render({className}: Props) {
    const {config} = useJimmy()

    const previewRef = useRef<HTMLDivElement>(null);

    function handleRender() {
        if (!previewRef.current) {
            console.error("No canvas attached for the render")
            return;
        }

        htmlToImage
            .toPng(previewRef.current, {
                skipFonts: true,
                cacheBust: true,
            })
            .then(dataUrl => {
                const link = document.createElement("a");
                link.download = `${config.title}.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch(err => {
                console.error("Render failed:", err);
            });
    }

    return <>
        <div className="absolute bottom-full left-full opacity-0">
            <PreviewCanvas
                ref={previewRef}
                config={config}
            />
        </div>
        <Button
            size="icon"
            variant="outline"
            onClick={handleRender}
        >
            <FileImage/>
        </Button>
    </>
}