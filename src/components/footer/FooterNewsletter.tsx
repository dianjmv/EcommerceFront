// application
import SocialLinks from '../shared/SocialLinks';

function FooterNewsletter() {
    return (
        <div className="site-footer__widget footer-newsletter text-blue-900">
            <h5 className="footer-newsletter__title font-bold">Suscribete</h5>
            <div className="footer-newsletter__text">
                Recibe todas nuestras promociones y descuentos especiales.
            </div>

            <form action="" className="footer-newsletter__form">
                <label className="sr-only" htmlFor="footer-newsletter-address">Email Address</label>
                <input
                    type="text"
                    className="footer-newsletter__form-input form-control"
                    id="footer-newsletter-address"
                    placeholder="Email Address..."
                />
                <button type="submit" className="footer-newsletter__form-button btn btn-primary">Subscribe</button>
            </form>


        </div>
    );
}

export default FooterNewsletter;
