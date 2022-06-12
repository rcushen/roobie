const Header = ({landing}) => {
    
    return (
        <div className="header-container">
            <div className="content-container">
                <div className="header">
                    <div className="header-nav header-nav-left">
                        <a href="/"><p>About</p></a>
                    </div>
                    { landing === true ? "" : <div className="header-logo"><a href="/"><h3>roobie</h3></a></div> }
                    <div className="header-nav header-nav-right">
                        <p><a href="/">Contact Us</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Header;