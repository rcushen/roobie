import React from 'react';

import Header from './../elements/Header';
import About from './../elements/About';
import Footer from './../elements/Footer';

const AboutPage = () => {
    return (
        <div className="about-page-container">
            <Header landing={false}/>
            <About />
            <Footer />
        </div>
    )
};

export default AboutPage;