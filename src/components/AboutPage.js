import Header from './Header';
import About from '../features/about/About';
import Footer from '../features/footer/Footer';

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