import type {JimmyConfig, JimmyNodeMap} from "./types"

export const defaults = {
    text: {
        color: "white",
        textAlign: "left",
        verticalAlign: "start",
        fontFamily: "Trebuchet MS, sans-serif",
        fontSize: 18,
        fontWeight: 400,
        fontStyle: "normal",
    },
    image: {
        fit: "fill"
    }
}

type Defaults = typeof defaults

export type WithDefaults<K extends keyof JimmyNodeMap> =
    Omit<JimmyNodeMap[K], keyof Defaults> &
    Required<Defaults[K]>

export const defaultConfig: JimmyConfig = {
    title: "Jimmage",
    canvas: {
        width: 1920,
        height: 1080,
    },
    nodes: []
}