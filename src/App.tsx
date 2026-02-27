import Preview from "./components/preview/preview.tsx";
import type {JimmyConfig} from "@/lib/core/types.ts";

export default function App() {
    return <main className="h-screen w-screen">
        <Preview config={config}/>
    </main>
}

const config: JimmyConfig = {
    title: "Dev Config",
    canvas: {
        width: 1920,
        height: 1080
    },
    backgroundColor: "red",
    nodes: [
        {
            type: "image",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HR8m_T3ZYVSLkZpeW0H7svHSjwtjmSnQklWjlb-pnuha3CeCa5Ufs_FvHyCcTvGtriFxAnsGNu1DhMPyBRE8udvkBBvHCuYMqZxp6A&s=10",
            fit: "fill",
            position: {
                top: -25,
                left: -25,
            },
            size: {
                width: 700,
                height: 512
            }
        }
    ]
}