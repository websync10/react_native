interface StyleOption {
    id: string
    title: string
    description: string
    image: any
}

export const styleOptions: StyleOption[] = [
    {
        id: "casual-streetwear",
        title: "Casual/Streetwear",
        description: "Hoodies, graphic tees, joggers, sneakers, laid-back, sporty, and influenced by urban culture.",
        image: require("../../assets/images/bag.png"),
    },
    {
        id: "business-smart-casual",
        title: "Business/Smart Casual",
        description: "Chinos, button-downs, blazers, loafers and smart attire for work or dinner dates.",
        image: require("../../assets/images/bag.png"),
    },
    {
        id: "classic-traditional",
        title: "Classic/Traditional",
        description: "Well-fitted jeans, polo shirts, leather shoes, timeless pieces that never go out of style.",
        image: require("../../assets/images/bag.png"),
    },
    {
        id: "athleisure-sporty",
        title: "Athleisure/Sporty",
        description: "Performance fabrics, track jackets, branded trainers, athletic looks worn beyond the gym.",
        image: require("../../assets/images/bag.png"),
    },
    {
        id: "minimalist-modern",
        title: "Minimalist/Modern",
        description: "Neutral colors, slim cuts, simple styling, clean lines, perfect for a sophisticated vibe.",
        image: require("../../assets/images/bag.png"),
    },
    {
        id: "edgy-rocker",
        title: "Edgy/Rocker",
        description: "Leather jackets, black jeans, combat boots, dark, rebellious, and inspired by punk or metal scenes.",
        image: require("../../assets/images/bag.png"),
    },
]