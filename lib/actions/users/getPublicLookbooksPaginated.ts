import { supabase } from "@/lib/supabase";

export const getPublicLookbooksPaginated = async (
    pageNumber: number,
    pageSize: number = 10
) => {
    const { data, error } = await supabase.rpc("get_public_lookbooks_paginated", {
        page_number: pageNumber,
        page_size: pageSize,
    });
    if (error) {
        console.error("Error fetching public lookbooks:", error);
        return [];
    }
    return data;
};
