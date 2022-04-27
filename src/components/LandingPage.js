import Header from './Header';
import Search from '../features/search/Search';
import Footer from '../features/footer/Footer';

const LandingPage = () => {
    return (
        <div className="landing-page-container">
            <Header />
            <Search />
            <Footer />
        </div>
    )
};

export default LandingPage;