import { Link } from "react-router-dom";

import './../ComponentStyles.css'

const Header = ({landing}) => {
    
    return (
        <div className="header-container">
            <div className="content-container">
                <div className="header">
                    <div className="header-nav header-nav-left">
                        <Link to="/about">About</Link>
                    </div>
                    { landing === true ? "" : <div className="header-logo"><a href="/"><h3>roobie</h3></a></div> }
                    <div className="header-nav header-nav-right">
                        <Link to="/contactus">Contact Us</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Header;