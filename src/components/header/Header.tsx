// react
import { memo } from 'react';

// third-party
import { FormattedMessage } from 'react-intl';

// application
import AppLink from '../shared/AppLink';
import LogoSvg from '../../svg/logo-south-import.svg';
import NavPanel from './NavPanel';
import Search from './Search';
import Topbar from './Topbar';
import { useCompanyInfo } from '../../store/company/companyHooks';

export type HeaderLayout = 'default' | 'compact';

export interface HeaderProps {
    layout?: HeaderLayout;
}

function Header(props: HeaderProps) {
    const { layout = 'default' } = props;
    let bannerSection;
    const companyInfoState = useCompanyInfo();
    const logo =
        companyInfoState.logo.length > 0 ? `${process.env.NEXT_PUBLIC_BASE_URI}${companyInfoState.logo[0].url}` : '';

    if (layout === 'default') {
        bannerSection = (
            <div className="site-header__middle container">
                <div className="site-header__logo">
                    <AppLink href="/">
                        {' '}
                        <img src={logo} alt="" />{' '}
                    </AppLink>
                </div>
                <div className={'w-90'}>
                    <NavPanel layout={layout} />
                </div>
            </div>
        );
    }

    return <div className="site-header">{bannerSection}</div>;
}

export default memo(Header);
