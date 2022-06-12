import { Link } from "react-router-dom";

const Header = ({landing}) => {
    
    return (
        <div className="header-container">
            <div className="content-container">
                <div className="header">
                    <div className="header-nav header-nav-left">
                        <p><Link to="/about">About</Link></p>
                    </div>
                    { landing === true ? "" : <div className="header-logo"><a href="/"><h3>roobie</h3></a></div> }
                    <div className="header-nav header-nav-right">
                        <p><Link to="/contactus">Contact Us</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Header;