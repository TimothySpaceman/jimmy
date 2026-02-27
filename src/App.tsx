import Preview from "./components/preview/preview.tsx";
import type {JimmyConfig} from "@/lib/core/types.ts";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import {JimmyProvider} from "@/components/jimmyProvider/jimmyProvider.tsx";
import Editor from "@/components/editor/editor.tsx";
import {ThemeProvider} from "@/components/themeProvider/themeProvider.tsx";

export default function App() {
    return <ThemeProvider defaultTheme="dark">
        <JimmyProvider initialConfig={config}>
            <main className="h-screen w-screen dark">
                <ResizablePanelGroup>
                    <ResizablePanel defaultSize="50%">
                        <Editor/>
                    </ResizablePanel>
                    <ResizableHandle/>
                    <ResizablePanel>
                        <Preview/>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        </JimmyProvider>
    </ThemeProvider>
}

const config: JimmyConfig = {
    title: "Dev Config",
    canvas: {
        width: 1920,
        height: 1080,
        background: "#ff0000",
    },
    nodes: [
        {
            type: "image",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HR8m_T3ZYVSLkZpeW0H7svHSjwtjmSnQklWjlb-pnuha3CeCa5Ufs_FvHyCcTvGtriFxAnsGNu1DhMPyBRE8udvkBBvHCuYMqZxp6A&s=10",
            fit: "fill",
            position: {
                // top: -25,
                // left: -25,
            },
            size: {
                width: 700,
                height: 512
            }
        },
        {
            type: "text",
            content: "Hello world! Hello world! Hello world! Hello world! Hello world!",
            fontFamily: "Consolas",
            fontSize: 50,
            textAlign: "center",
            verticalAlign: "center",
            size: {
                width: 700,
                height: 512
            }
        }
    ]
}