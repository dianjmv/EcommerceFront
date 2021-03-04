// react
import React, { useEffect, useRef, useState, memo } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import Cart20Svg from '../../svg/cart-20.svg';
import Heart20Svg from '../../svg/heart-20.svg';
import Indicator from '../header/Indicator';
import LogoSmallSvg from '../../svg/logo-small.svg';
import Menu18x14Svg from '../../svg/menu-18x14.svg';
import Search from '../header/Search';
import Search20Svg from '../../svg/search-20.svg';
import url from '../../services/url';
import { useCart } from '../../store/cart/cartHooks';
import { useMobileMenuOpen } from '../../store/mobile-menu/mobileMenuHooks';
import { useWishlist } from '../../store/wishlist/wishlistHooks';
import { useCompanyInfo } from '../../store/company/companyHooks';
import Person20Svg from '../../svg/person-20.svg';
import IndicatorAccount from '../header/IndicatorAccount';

function MobileHeader() {
    const [searchOpen, setSearchOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const cart = useCart();
    const {
        items: { length: wishlistCount },
    } = useWishlist();
    const mobileMenuOpen = useMobileMenuOpen();

    useEffect(() => {
        if (searchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [searchOpen]);

    const handleOpenSearch = () => {
        setSearchOpen(true);
    };

    const handleCloseSearch = () => {
        setSearchOpen(false);
    };

    const searchClasses = classNames('mobile-header__search', {
        'mobile-header__search--open': searchOpen,
    });
    const companyInfoState = useCompanyInfo();
    const logo =
        companyInfoState.logo.length > 0 ? `${process.env.NEXT_PUBLIC_BASE_URI}${companyInfoState.logo[0].url}` : '';

    return (
        <div className="mobile-header">
            <div className="mobile-header__panel">
                <div className="container">
                    <div className="mobile-header__body">
                        <button type="button" className="mobile-header__menu-button" onClick={mobileMenuOpen}>
                            <Menu18x14Svg />
                        </button>
                        <AppLink href={url.home()} className="mobile-header__logo w-32">
                            <img src={logo} alt="" />
                        </AppLink>
                        <div className="mobile-header__indicators">
                            <Indicator
                                className="indicator--mobile"
                                url={url.cart()}
                                value={cart.quantity}
                                icon={<Cart20Svg />}
                            />
                            <IndicatorAccount />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(MobileHeader);
