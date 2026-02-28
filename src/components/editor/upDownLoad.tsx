import {type ChangeEvent, useRef} from "react";
import {Button} from "@/components/ui/button.tsx";
import {FileDown, FileUp} from "lucide-react";
import {useJimmy} from "@/components/jimmyProvider/jimmyProvider.tsx";

export default function UpDownLoad() {
    const {config, setConfig} = useJimmy();

    const inputRef = useRef<HTMLInputElement>(null);

    function handleUploadClick() {
        inputRef.current?.click();
    }

    function handleUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
        if (file.type !== "application/json") {
            alert("Unsupported format not allowed.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== "string") {
                    throw new Error("Invalid file content");
                }
                const parsed = JSON.parse(text);
                setConfig(parsed);
            } catch (err) {
                console.error(err);
                alert("Invalid JSON file.");
            }
        };
        reader.onerror = () => {
            alert("Error reading file.");
        };
        reader.readAsText(file);
        event.target.value = "";
    }

    function handleDownload() {
        try {
            const json = JSON.stringify(config, null, 2);
            const blob = new Blob([json], {type: "application/json"});
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `${config.title}.json`;
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert("Failed to download configuration.");
        }
    }

    return (
        <div className="flex gap-1">
            <Button onClick={handleDownload} variant="outline" size="icon">
                <FileDown/>
            </Button>

            <input
                type="file"
                ref={inputRef}
                onChange={handleUpload}
                className="hidden"
                accept="application/json"
            />
            <Button onClick={handleUploadClick} variant="outline" size="icon">
                <FileUp/>
            </Button>
        </div>
    );
}