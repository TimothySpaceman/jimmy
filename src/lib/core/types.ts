import {z} from "zod";

const hexColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
    message: 'Invalid hex color code',
});

export const positionSchema = z.object({
    top: z.number("Top must be a number in pixels").optional(),
    bottom: z.number("Bottom must be a number in pixels").optional(),
    left: z.number("Left must be a number in pixels").optional(),
    right: z.number("Right must be a number in pixels").optional(),
})
export type Position = {
    top?: number
    bottom?: number
    left?: number
    right?: number
}

export const sizeSchema = z.object({
    width: z.number("Width must be a number in pixels").optional(),
    height: z.number("Height must be a number in pixels").optional(),
})
export type Size = {
    width?: number
    height?: number
}

export const basicNodeSchema = z.object({
    name: z.string().optional(),
    position: positionSchema,
    size: sizeSchema,
})
export type BasicNode = {
    name?: string
    position: Position
    size: Size
}

export const textAlignOptions = ["left", "center", "right", "justify"]
export const textAlignSchema = z.enum(textAlignOptions, `Available options: ${textAlignOptions.join(", ")}`);
export type TextAlign = "left" | "center" | "right" | "justify"

export const verticalAlignOptions = ["start", "end", "center"]
export const verticalAlignSchema = z.enum(verticalAlignOptions, `Available options: ${verticalAlignOptions.join(", ")}`);
export type VerticalAlign = "start" | "end" | "center"

export const fontStyleOptions = ["normal", "italic", "oblique"]
export const fontStyleSchema = z.enum(fontStyleOptions, `Available options: ${fontStyleOptions.join(", ")}`);
export type FontStyle = "normal" | "italic" | "oblique"

export const textNodeSchema = basicNodeSchema.extend({
    type: z.literal("text"),
    content: z.string('Content must be a string'),
    color: hexColorSchema.optional(),
    textAlign: textAlignSchema.optional(),
    verticalAlign: verticalAlignSchema.optional(),
    fontFamily: z.string().optional(),
    fontSize: z.number("Font size must be a number in pixels").optional(),
    fontWeight: z.number("Font weight must be a number in pixels").optional(),
    fontStyle: fontStyleSchema.optional(),
});
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

export const fitOptions = ["cover", "contain", "fill", "scale-down", "none"];
export const fitSchema = z.enum(fitOptions, `Available options: ${fitOptions.join(", ")}`);
export type Fit = "cover" | "contain" | "fill" | "scale-down" | "none"

export const imageNodeSchema = basicNodeSchema.extend({
    type: z.literal("image"),
    src: z.string("You must provide an src"),
    fit: fitSchema.optional(),
});
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

export const jimmyNodeSchema = z.discriminatedUnion(
    "type",
    [textNodeSchema, imageNodeSchema],
    "Unknown node type"
);

export const jimmyConfigSchema = z.object({
    title: z.string("Title is required"),
    description: z.string().optional(),
    canvas: z.object({
        width: z.number("Width must be a number in pixels"),
        height: z.number("Height must be a number in pixels"),
        background: hexColorSchema,
    }),
    nodes: z.array(jimmyNodeSchema),
});

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

