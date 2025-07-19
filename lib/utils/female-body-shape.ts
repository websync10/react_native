interface BodyShapeOption {
    id: string
    title: string
    description: string
}

export const femaleBodyShapes: BodyShapeOption[] = [
    {
        id: "rectangle",
        title: "Rectangle",
        description:
            "Shoulders and hips are roughly the same width; torso goes straight down with little taper at the waist. Think tall, lean frame.",
    },
    {
        id: "triangle",
        title: "Triangle",
        description:
            "Hips and waist are wider than the shoulders, giving a bottom-heavy appearance. Often seen in men who carry weight in the belly or lower body.",
    },
    {
        id: "inverted-triangle",
        title: "Inverted Triangle",
        description:
            'Broad shoulders and chest, narrowing down to the hips and waist area. Classic "V shape" many bodybuilders chase.',
    },
    {
        id: "oval",
        title: "Oval (or Round)",
        description: "Midsection is wider than shoulders and hips, with more weight carried around the belly area.",
    },
    {
        id: "trapezoid",
        title: "Trapezoid",
        description:
            'Widest at the shoulders, slightly narrower at the hips and waist area, but not as dramatically inverted triangle. Often considered the "ideal" male shape in fashion.',
    },
]
