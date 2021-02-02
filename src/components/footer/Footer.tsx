import { FunctionComponent } from 'react';

// application
import FooterContacts from './FooterContacts';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import ToTop from './ToTop';

// data stubs
import theme from '../../data/theme';
import {useCompanyInfo} from "../../store/company/companyHooks";

const Footer: FunctionComponent = () => {
    const date   = new Date()
    const compnayInfo = useCompanyInfo()
    const informationLinks = [
        { title: 'Acerca de nosotros', url: '' },
        { title: 'Ubicanos', url: '' },
        { title: 'Blog', url: '' },
        { title: 'Contáctanos', url: '' },
    ];

    const accountLinks = [
        { title: 'Preguntas Frecuentes', url: '' },
        { title: 'Mi Cuenta', url: '' },
        { title: 'Mis Pedidos', url: '' },
        { title: 'Devoluciones y Grantías', url: '' },
        { title: 'Términos y Condiciones', url: '' },
        { title: 'Políticas de Privacidad', url: '' },
    ];

    return (
        <div className="site-footer border-none">
            <div className="container">
                <div className="site-footer__widgets">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <FooterContacts />
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <FooterLinks title="Contactos" items={informationLinks} />
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <FooterLinks title="Servicio al Cliente" items={accountLinks} />
                        </div>
                        <div className="col-12 col-md-12 col-lg-4">
                            <FooterNewsletter />
                        </div>
                    </div>
                </div>

                <div className="site-footer__bottom">
                    <div className="site-footer__copyright">

                    </div>
                    <div className="site-footer__payments md:flex grid grid-cols-1">
                        <div className={'mr-6 mt-2'}>
                            Copyright {date.getFullYear()} <span className={'capitalize'}> {compnayInfo.company_name}. Todos los derechos reservados</span>
                        </div>

                        <img src="/images/payments-group.png" alt="" />
                    </div>
                </div>
            </div>
            <ToTop />
        </div>
    );
};

export default Footer;
