import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as QueryParams from "expo-auth-session/build/QueryParams";

export const createSessionFromUrl = async (url: string) => {
    const { params } = QueryParams.getQueryParams(url);


    const { access_token, refresh_token } = params;

    if (!access_token || !refresh_token) {
        console.log("Missing token(s) in URL");
    }

    const {data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
    });

    if (error) {
        throw new Error(error.message);
    }

    await AsyncStorage.setItem(
        'supabase.session',
        JSON.stringify({
            access_token,
            refresh_token,
        })
    );
    return data.session
};
