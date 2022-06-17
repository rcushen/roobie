import React from 'react';

import facebook from './../../assets/social_media_icons/facebook.png';
import instagram from './../../assets/social_media_icons/instagram.png'
import linkedin from './../../assets/social_media_icons/linkedin.png'

import './../ComponentStyles.css'

const Footer = ({resultsStatus = "succeeded"}) => {
    if (resultsStatus !== "succeeded") {
        return "";
    } else {
        return (
            <div className="footer-container">
                <div className="content-container">
                    <div className="footer-body">
                        <div className="social-media-icons">
                            <img className="social-media-icon" src={facebook} alt="facebook-icon"/>
                            <img className="social-media-icon" src={instagram} alt="instagram-icon"/>
                            <img className="social-media-icon" src={linkedin} alt="linkedin-icon"/>
                        </div>
                        <p>&#169; 2022 Roobie Media</p>
                    </div>
                </div>
            </div>
        )
    }
};

export default Footer;