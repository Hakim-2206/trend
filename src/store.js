import {create} from "zustand";


const myStore = create((set) => ({
    youtubeItems: [],
    redditItems: [],
    loading: false,
    fetchTrendYoutube: async () => {
        set({loading: true});
        try {
            const apiKey = import.meta.env.VITE_API_KEY_YOUTUBE;
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=FR&maxResults=10&key=${apiKey}`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.items && Array.isArray(data.items)) {
                set({youtubeItems: data.items, loading: false, error: null});
            } else {
                set({youtubeItems: [], loading: false, error: 'No YouTube items found'});
            }
        } catch (error) {
            set({youtubeItems: [], loading: false, error: error.message});
        }
    },
    fetchTrendReddit: async () => {
        set({loading: true});
        try {
            const url = 'https://www.reddit.com/r/all/top.json?limit=10&geo_filter=FR';
            const res = await fetch(url);
            const data = await res.json();

            if (data.data?.children && Array.isArray(data.data.children)) {
                set({redditItems: data.data.children, loading: false, error: null});
            } else {
                set({redditItems: [], loading: false, error: 'No Reddit posts found'});
            }
        } catch (error) {
            set({redditItems: [], loading: false, error: error.message});
        }
    }
}));

export default myStore;