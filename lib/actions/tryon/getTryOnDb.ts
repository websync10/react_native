import { supabase } from "@/lib/supabase";

export const getTryonData = async ({
    weather,
    bodyType,
    location,
    category,
}: {
    weather?: string;
    bodyType?: string;
    location?: string;
    category?: string;
}) => {
    let query = supabase.from('tryondb').select('*');

    if (weather) query = query.eq('weather', weather);
    if (bodyType) query = query.eq('body_type', bodyType);
    if (location) query = query.eq('location', location);
    if (category) query = query.eq('category', category);
    const { data, error } = await query;

    if (error) {
        console.error('Error fetching tryon data:', error);
        return [];
    }

    return data;
};
