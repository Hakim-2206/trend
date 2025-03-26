import {create} from "zustand";


const myStore = create((set) => ({
    items: [],
    loading: false,
    fetchTrendYoutube: async () => {
        set({loading: true});
        const apiKey = import.meta.env.VITE_API_KEY_YOUTUBE
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=FR&maxResults=10&key=${apiKey}`
        const res = await fetch(url);
        const data = await res.json()
        set({items: data, loading: false})

        if (data.items && Array.isArray(data.items)) {
            set({items: data.items, loading: false});
        } else {
            set({items: [], loading: false});
        }
    },
}));

export default myStore;