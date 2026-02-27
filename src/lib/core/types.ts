export type Position = {
    top?: number
    bottom?: number
    left?: number
    right?: number
}

export type Size = {
    width?: number
    height?: number
}

export type BasicNode = {
    name?: string
    position: Position
    size: Size
}

export type TextAlign = "left" | "center" | "right" | "justify"
export type VerticalAlign = "start" | "end" | "center"
export type FontStyle = "normal" | "italic" | "oblique"

export type TextNode = BasicNode & {
    type: "text"
    content: string
    color?: string
    textAlign?: TextAlign
    verticalAlign?: VerticalAlign
    fontFamily?: string
    fontSize?: number
    fontWeight?: number
    fontStyle?: FontStyle
}

export type Fit = "cover" | "contain" | "fill" | "scale-down" | "none"

export type ImageNode = BasicNode & {
    type: "image"
    src: string
    fit?: Fit
}

export type JimmyNodeMap = {
    text: TextNode
    image: ImageNode
}
export type JimmyNodeType = keyof JimmyNodeMap
export type JimmyNode = JimmyNodeMap[JimmyNodeType]

export type JimmyConfig = {
    title: string
    description?: string
    canvas: {
        width: number
        height: number
        background: string
    },
    nodes: JimmyNode[]
}

