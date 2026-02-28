import Preview from "./components/preview/preview.tsx";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import {JimmyProvider} from "@/components/jimmyProvider/jimmyProvider.tsx";
import Editor from "@/components/editor/editor.tsx";
import {ThemeProvider} from "@/components/themeProvider/themeProvider.tsx";
import UrlConfig from "@/components/urlConfig/urlConfig.tsx";
import {NuqsAdapter} from "nuqs/adapters/react";
import {defaultConfig} from "@/lib/core/defaults.ts";

export default function App() {
    return <NuqsAdapter>
        <ThemeProvider defaultTheme="dark">
            <JimmyProvider initialConfig={defaultConfig}>
                <UrlConfig/>
                <main className="h-screen w-screen">
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
    </NuqsAdapter>
}