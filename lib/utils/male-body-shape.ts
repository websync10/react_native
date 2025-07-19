interface BodyShapeOption {
    id: string
    title: string
    description: string
}

export const maleBodyShapes: BodyShapeOption[] = [
        {
            id: "rectangle",
            title: "Rectangle",
            description:
                "Shoulders and hips are roughly the same width; torso goes straight down with little definition at the waist. Athletic build.",
        },
        {
            id: "triangle",
            title: "Triangle",
            description:
                "Hips are wider than the shoulders, giving a bottom-heavy appearance. Weight tends to be carried in the lower body and hips.",
        },
        {
            id: "inverted-triangle",
            title: "Inverted Triangle",
            description:
                'Broad shoulders and chest, narrowing down to the hips. Classic "V shape" with strong upper body development.',
        },
        {
            id: "oval",
            title: "Oval (or Round)",
            description:
                "Midsection is wider than shoulders and hips, with weight carried around the belly area. Apple-shaped body type.",
        },
        {
            id: "trapezoid",
            title: "Trapezoid",
            description:
                "Widest at the shoulders, slightly narrower at the hips, creating a strong, masculine silhouette. Well-balanced proportions.",
        },
    ]