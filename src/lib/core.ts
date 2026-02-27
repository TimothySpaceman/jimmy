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

export type NodeType = "text" | "image"

export type BasicNode = {
    type: NodeType
    name?: string
    position?: Position
    size?: Size
}

export type TextNode = BasicNode & {
    type: "text"
    content: string
    fontFamily?: string
    fontSize?: string
    fontWeight?: string
    fontStyle?: string
}

export type ImageNode = BasicNode & {
    type: "image"
    src: string
    fit?: "cover" | "contain"
}

export type Node = TextNode | ImageNode

export type Config = {
    title: string
    description?: string
    canvas: {
        width: number
        height: number
    },
    backgroundColor?: string,
    nodes: Node[],
}

