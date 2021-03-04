// application
import SocialLinks from '../shared/SocialLinks';
import MailingRepository from '../../api/mailingRepository';
import { useState } from 'react';
import { toast } from 'react-toastify';

function FooterNewsletter() {
    const maillingRepository = new MailingRepository();
    const [email, setEmail] = useState<string>('');

    function handleSubmitEmailSubscription() {
        if (email !== '') {
            maillingRepository
                .saveMailForSubscription(email)
                .then(({ data }) => console.log(data))
                .catch(err => console.log(err))
                .finally(() => {
                    toast.success('Gracias por suscribirte!!');
                    setEmail('');
                });
        } else {
            toast.error('El email no es válido');
        }
    }

    return (
        <div className="site-footer__widget footer-newsletter text-blue-900">
            <h5 className="footer-newsletter__title font-bold">Suscribete</h5>
            <div className="footer-newsletter__text">Recibe todas nuestras promociones y descuentos especiales.</div>

            <form action="" className="footer-newsletter__form">
                <label className="sr-only" htmlFor="footer-newsletter-address">
                    Email
                </label>
                <input
                    type="text"
                    className="footer-newsletter__form-input form-control"
                    id="footer-newsletter-address"
                    placeholder="Ingresa tu email..."
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button
                    type="button"
                    className="footer-newsletter__form-button btn btn-primary"
                    onClick={handleSubmitEmailSubscription}
                >
                    Suscribirse
                </button>
            </form>
        </div>
    );
}

export default FooterNewsletter;
