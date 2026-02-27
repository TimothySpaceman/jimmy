export function withPx(source: Record<string, number>) {
    return Object.fromEntries(
        Object.entries(source).map(([k, v]) => [k, `${v}px`])
    )
}