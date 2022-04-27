const Footer = () => {
    return (
        <div className="footer-container">
            <div className="content-container">
                <div className="footer-body">
                    <h2>roobie</h2>
                    <p>Where to next?</p>
                    <form>
                        <label>
                            Get the latest from roobie in your inbox
                        </label>
                        <br />
                        <input type="text" name="emailsubscribe" id="emailsubscribe"/>
                        <input type="submit" value="Subscribe" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Footer;