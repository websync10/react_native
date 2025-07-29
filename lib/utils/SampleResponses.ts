export const sampleResponses = [
        "Hello! I'm Myuze, your personal style assistant. I'm here to help you with all your fashion and outfit questions. What would you like to know about today?",
        "For a business meeting, I'd recommend a crisp white shirt with tailored trousers or a pencil skirt. Add a blazer for extra professionalism and finish with comfortable yet stylish shoes.",
        { type: 'height-selection', content: 'Let me help you find the perfect fit!'},
        { type: 'fit-preference', content: 'Tell me about your style preferences!'},
        {
            type: 'outfit-carousel',
            content: 'Check out these amazing looks!',
            data: {
                outfits: [
                    { id: '1', name: 'Concert Look 1', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop' },
                    { id: '2', name: 'Concert Look 2', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop' },
                    { id: '3', name: 'Concert Look 3', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=400&fit=crop' }
                ]
            }
        },
        {
            type: 'outfit-recommendations',
            content: 'Here are some curated outfit ideas for you!',
            data: {
                title: 'Got it! Bali + warm = comfy + cute.',
                description: 'Here are 3 outfit ideas that scream: "Cool but effortless traveler." 🌴',
                recommendations: [
                    {
                        title: 'Outfit 1: Day Explorer',
                        items: ['Breezy linen shirt', 'Khaki shorts', 'Slide sandals', 'Straw tote']
                    },
                    {
                        title: 'Outfit 2: Sunset Dinner',
                        items: ['Sleeveless maxi dress', 'Statement earrings', 'Flat sandals']
                    },
                    {
                        title: 'Outfit 3: Beach Rider',
                        items: ['Graphic tee', 'Wide-leg pants', 'Bucket hat']
                    }
                ]
            }
        },
        {
            type: 'capsule-wardrobe',
            content: 'Your perfect travel wardrobe!',
            data: {
                wardrobeItems: {
                    dayLook: ['Linen shirt (white or sage green)', 'Relaxed-fit shorts', 'Leather sandals or canvas sneakers'],
                    eveningVibe: ['Light short-sleeve shirt (bold pattern)', 'Chino pants', 'Casual loafers or sandals'],
                    extras: ['Sunglasses', 'Woven bag', 'Optional: Light scarf or bucket hat']
                }
            }
        },
        { type: 'premium-upgrade', content: 'Ready to unlock more styling magic?' },
        "Date night calls for something that makes you feel confident! Consider a midi dress in a flattering silhouette, paired with heels and delicate jewelry. A leather jacket adds an edgy touch.",
        "Summer 2024 trends include vibrant colors, flowy fabrics, and sustainable fashion. Think linen sets, bright florals, and statement accessories that pop against neutral bases.",
        "A black dress is incredibly versatile! Dress it up with heels and statement jewelry for evening, or down with white sneakers and a denim jacket for day. Add a colorful belt to define your waist."
    ];