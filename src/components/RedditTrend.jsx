import React, {useEffect, useState} from 'react';
import myStore from "../store.js";

const RedditTrend = () => {
    const {items, loading, fetchTrendReddit} = myStore()
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchTrendReddit()
    }, []);

    const handleNext = () => {
        setCurrentIndex(prev => (prev === items.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const currentItem = items[currentIndex];
    const isFirstItem = currentIndex === 0;
    const isLastItem = currentIndex === items.length - 1;

    return (
        <div className="reddit">
            <h1 className='text-center font-bold mt-8'>Les tendances Reddit</h1>
            {loading && <p className="text-center text-lg">Loading...</p>}

            {!loading && items.length > 0 && (
                <div className="relative max-w-4xl mx-auto mt-8 min-h-[500px] flex items-center">
                    {/* Flèche de gauche */}
                    <button
                        onClick={handlePrev}
                        className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg z-10 hover:bg-gray-100 transition ${isFirstItem ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isFirstItem}
                        style={{top: '50%'}}
                    >
                        &#8592;
                    </button>

                    {/* Élément courant */}
                    <div className="w-full p-4">
                        <div className="bg-white p-6 rounded-lg shadow-xl mx-auto max-w-2xl">
                            <a href={`https://www.reddit.com${currentItem.data.permalink}`} target="_blank"
                               rel="noopener noreferrer">
                                <img
                                    className="w-full h-64 object-cover rounded-md mb-4"
                                    src={currentItem.data.preview?.images?.[0]?.source?.url || "fallback_image.jpg"}
                                    alt={currentItem.data.title}
                                />
                                <h3 className="text-2xl font-bold text-center mb-2">
                                    {currentItem.data.title}
                                </h3>
                                <p className="text-gray-600 text-center">
                                    r/{currentItem.data.subreddit}
                                </p>
                            </a>
                        </div>
                    </div>

                    {/* Flèche de droite */}
                    <button
                        onClick={handleNext}
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg z-10 hover:bg-gray-100 transition ${isLastItem ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLastItem}
                        style={{top: '50%'}}
                    >
                        &#8594;
                    </button>
                </div>
            )}

            {/* Indicateurs de position */}
            {!loading && items.length > 0 && (
                <div className="flex justify-center mt-4 space-x-2">
                    {items.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RedditTrend;