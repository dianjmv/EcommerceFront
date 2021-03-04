// data stubs
import theme from '../../data/theme';
import { useCompanyInfo } from '../../store/company/companyHooks';
import BaseRepository from '../../api/repository/baseRepository';

function FooterContacts() {
    const companyInfo = useCompanyInfo();

    const logo = companyInfo.logo.length > 0 ? `${process.env.NEXT_PUBLIC_BASE_URI}${companyInfo.logo[0].url}` : '';
    return (
        <div className="site-footer__widget footer-contacts pt-6">
            <img src={`${logo}`} alt="" className={'my-auto'} />
        </div>
    );
}

export default FooterContacts;
