import React from 'react';
import Navbar from "../components/Navbar.jsx";
import YoutubeTrend from "../components/YoutubeTrend.jsx";
import RedditTrend from "../components/RedditTrend.jsx";


const Home = () => {

    return (
        <div>
            <Navbar/>
            <YoutubeTrend/>
            <RedditTrend/>
        </div>
    );
}

export default Home;