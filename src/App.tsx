import Preview from "./components/preview/preview.tsx";
import type {Config} from "@/lib/core.ts";

export default function App() {
    return <main className="h-screen w-screen">
        <Preview config={config}/>
    </main>
}

const config: Config = {
    title: "Dev Config",
    canvas: {
        width: 1920,
        height: 1080
    },
    backgroundColor: "red",
    nodes: []
}