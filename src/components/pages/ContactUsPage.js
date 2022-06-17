import React from 'react';

import Header from './../elements/Header';
import ContactUs from './../elements/ContactUs';
import Footer from './../elements/Footer';

const ContactUsPage = () => {
    return (
        <div className="contactus-page-container">
            <Header landing={false}/>
            <ContactUs />
            <Footer />
        </div>
    )
};

export default ContactUsPage;