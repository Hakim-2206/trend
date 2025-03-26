import React, {useEffect, useState} from 'react';
import myStore from "../store.js";

const RedditTrend = () => {
    const {redditItems, loading, fetchTrendReddit} = myStore()
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchTrendReddit()
    }, []);

    const handleNext = () => {
        setCurrentIndex(prev => (prev === redditItems.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? redditItems.length - 1 : prev - 1));
    };


    const cleanRedditUrl = (url) => {
        if (!url) return null;
        return url.replace(/&amp;/g, '&');
    };

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num;
    };

    const renderMedia = (item) => {
        if (!item) return null;

        if (item.is_video && item.media?.reddit_video) {
            const videoUrl = cleanRedditUrl(item.media.reddit_video.fallback_url);
            return (
                <div className="w-full h-64 bg-black rounded-md mb-4 overflow-hidden flex items-center justify-center">
                    <video
                        controls
                        className="max-w-full max-h-full object-contain"
                        poster={item.thumbnail}
                    >
                        <source src={videoUrl} type="video/mp4"/>
                    </video>
                </div>
            );
        }

        if (item.url && /\.(jpg|jpeg|png|gif)$/i.test(item.url)) {
            return (
                <div className="w-full h-64 bg-black rounded-md mb-4 overflow-hidden flex items-center justify-center">
                    <img
                        className="max-w-full max-h-full object-contain"
                        src={cleanRedditUrl(item.url)}
                        alt={item.title}
                        onError={(e) => {
                            e.target.src = 'fallback_image.jpg';
                        }}
                    />
                </div>
            );
        }

        if (item.url && !item.is_self) {
            return (
                <div className="bg-gray-700 p-3 rounded-md border border-gray-600">
                    <p className="text-blue-400 truncate">{item.url}</p>
                </div>
            );
        }

        return null;
    };

    const currentItem = redditItems[currentIndex]?.data;
    const isFirstItem = currentIndex === 0;
    const isLastItem = currentIndex === redditItems.length - 1;

    if (loading) {
        return (
            <div className="reddit">
                <h1 className='text-center font-bold mt-8 text-white'>Les tendances Reddit</h1>
                <p className="text-center text-lg text-white">Loading...</p>
            </div>
        );
    }

    if (!redditItems.length || !currentItem) {
        return (
            <div className="reddit">
                <h1 className='text-center font-bold mt-8 text-white'>Les tendances Reddit</h1>
                <p className="text-center text-lg text-white">Aucun post trouvé</p>
            </div>
        );
    }

    return (
        <div className="reddit">
            <h1 className='text-center font-bold mt-30 text-blue-400/80 text-xl underline'>Les tendances Reddit
                ({redditItems.length})</h1>

            <div className="relative max-w-4xl mx-auto mt-8 h-[550px] flex items-center">
                {/* Flèche gauche - position fixe */}
                <button
                    onClick={handlePrev}
                    className={`absolute left-10 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-lg z-10 hover:bg-gray-100 transition ${isFirstItem ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isFirstItem}
                >
                    &#8592;
                </button>

                {/* Carte Reddit */}
                <div className="w-full p-4">
                    <div
                        className="bg-gray-800 p-6 rounded-lg shadow-xl mx-auto max-w-2xl border border-gray-700 min-h-[500px] flex flex-col">
                        {/* En-tête */}
                        <div className="flex items-center mb-4">
                            <div
                                className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-2">
                                {currentItem.author?.[0]?.toUpperCase() || 'R'}
                            </div>
                            <div>
                                <p className="text-gray-300 font-medium">u/{currentItem.author || 'unknown'}</p>
                                <p className="text-gray-500 text-sm">r/{currentItem.subreddit || 'reddit'}</p>
                            </div>
                        </div>

                        {/* Contenu */}
                        <a
                            href={`https://www.reddit.com${currentItem.permalink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block flex-grow"
                        >
                            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                                {currentItem.title || 'Sans titre'}
                            </h3>

                            {currentItem.selftext && (
                                <p className="text-gray-300 mb-4 line-clamp-3">
                                    {currentItem.selftext}
                                </p>
                            )}

                            {renderMedia(currentItem)}
                        </a>

                        {/* Interactions */}
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center text-gray-400">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span className="font-medium">{formatNumber(currentItem.ups)}</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 text-gray-400">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span>{formatNumber(currentItem.num_comments)}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                                    </svg>
                                    <span>Partager</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Flèche droite - position fixe */}
                <button
                    onClick={handleNext}
                    className={`absolute right-10 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-lg z-10 hover:bg-gray-100 transition ${isLastItem ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLastItem}
                >
                    &#8594;
                </button>
            </div>

            {/* Indicateurs */}
            <div className="flex justify-center mt-4 space-x-2 mb-8">
                {redditItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-600'}`}
                        aria-label={`Aller au post ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default RedditTrend;