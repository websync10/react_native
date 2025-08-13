import Header from "@/components/Header";
import LookbookCard from "@/components/lookbookCard";
import { getPublicLookbooksPaginated } from "@/lib/actions/users/getPublicLookbooksPaginated";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export type LookBook = {
    id: string;
    userId: string;
    image: string;
    title: string;
    date: string;
    is_public: boolean;
    created_at: string;
    updated_at: string;
};

const PublicLookbookFeed = () => {
    const [lookbooks, setLookbooks] = useState<LookBook[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMore = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const newLookbooks = await getPublicLookbooksPaginated(page);
        setLookbooks((prev) => [...prev, ...newLookbooks]);
        setHasMore(newLookbooks.length > 0);
        setPage((prev) => prev + 1);
        setLoading(false);
    };

    useEffect(() => {
        fetchMore();
    }, []);

    return (
        <>
            <View style={{ margin: 32 }}>
                <Header title="Public Look Books" />
            </View>
            <FlatList
                data={lookbooks}
                keyExtractor={(item) => item.id}
                numColumns={1}
                style={{ marginHorizontal: 20 }}
                renderItem={({ item }) => (
                    <LookbookCard
                        id={item.id}
                        image={{ uri: item.image }}
                        title={item.title}
                        date={item.date}
                        is_public={item.is_public}
                        lookbookUserId={item.userId}
                    />
                )}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
            />
        </>
    );
};

export default PublicLookbookFeed;
