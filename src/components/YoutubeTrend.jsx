import React, {useEffect, useState} from 'react';
import myStore from "../store.js";

const YoutubeTrend = () => {

    const {items, loading, fetchTrendYoutube} = myStore()
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchTrendYoutube()
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
        <div className="youtube">
            <h1 className='text-center font-bold mt-8 text-white'>Les tendances Youtube ( {items.length} )</h1>
            {loading && <p className="text-center text-lg text-white">Loading...</p>}

            {!loading && items.length > 0 && (
                <div
                    className="relative max-w-4xl mx-auto mt-8 min-h-[500px] flex items-center"> {/* Conteneur fixe avec hauteur minimum */}
                    {/* Flèche de gauche - position fixe */}
                    <button
                        onClick={handlePrev}
                        className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white w-13 h-13 rounded-full shadow-lg z-10 hover:bg-gray-100 transition ${isFirstItem ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isFirstItem}
                        style={{top: '50%'}} /* Position forcée à 50% */
                    >
                        &#8592;
                    </button>

                    {/* Élément courant avec contenu */}
                    <div className="w-full p-4">
                        <div className="bg-black-700 p-6 rounded-lg shadow-xl mx-auto max-w-2xl">
                            <a href={`https://www.youtube.com/watch?v=${currentItem.id}`} target={"_blank"}>
                                <img
                                    className="w-full h-64 object-cover rounded-md mb-4"
                                    src={currentItem.snippet.thumbnails.high.url}
                                    alt={currentItem.snippet.title}
                                />
                                <h3 className="text-2xl font-bold text-center mb-2 text-white">
                                    {currentItem.snippet.title}
                                </h3>
                                <p className="text-gray-600 text-center ">
                                    {currentItem.snippet.channelTitle}
                                </p>
                            </a>
                        </div>
                    </div>

                    {/* Flèche de droite - position fixe */}
                    <button
                        onClick={handleNext}
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white w-13 h-13 rounded-full shadow-lg z-10 hover:bg-gray-100 transition ${isLastItem ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLastItem}
                        style={{top: '50%'}} /* Position forcée à 50% */
                    >
                        &#8594;
                    </button>
                </div>
            )}

            {/* Indicateurs de position (toujours en bas) */}
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

export default YoutubeTrend;