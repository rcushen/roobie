import Header from './Header';
import ContactUs from '../features/contactus/ContactUs';
import Footer from '../features/footer/Footer';

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