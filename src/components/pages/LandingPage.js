import React from 'react';

import Header from './../elements/Header';
import Search from './../../features/search/Search';
import Footer from './../elements/Footer';

const LandingPage = () => {
    return (
        <div className="landing-page-container">
            <Header landing={true}/>
            <Search />
            <Footer />
        </div>
    )
};

export default LandingPage;