import Header from './Header';
import Results from '../features/results/Results';
import Footer from '../features/footer/Footer';

const ResultsPage = () => {
    return (
        <div className="results-page-container">
            <Header />
            <Results />
            <Footer />
        </div>
    )
};

export default ResultsPage;