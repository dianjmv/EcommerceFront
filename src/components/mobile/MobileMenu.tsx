// react
import { memo, useEffect, useState } from 'react';

// third-party
import classNames from 'classnames';

// application
import Cross20Svg from '../../svg/cross-20.svg';
import MobileLinks from './MobileLinks';
import { useCurrencyChange } from '../../store/currency/currencyHooks';
import { useLocaleChange } from '../../store/locale/localeHooks';
import { useMobileMenu, useMobileMenuClose } from '../../store/mobile-menu/mobileMenuHooks';

// data stubs
import dataMobileMenu from '../../data/mobileMenu';

import { IMobileMenu, IMobileMenuLink } from '../../interfaces/menus/mobile-menu';
import MobileMenuData from '../../data/mobileMenu';

function MobileMenu() {
    const mobileMenu = useMobileMenu();
    const mobileMenuClose = useMobileMenuClose();
    const localeChange = useLocaleChange();
    const currencyChange = useCurrencyChange();
    const mobileMenuData = new MobileMenuData();

    const classes = classNames('mobilemenu', {
        'mobilemenu--open': mobileMenu.open,
    });
    const [mobileData, setMobileData] = useState<IMobileMenu>([]);

    useEffect(() => {
        mobileMenuData.getMobileMenu().then(menu => setMobileData(menu));
    }, []);

    const handleItemClick = (item: IMobileMenuLink) => {
        if (item.type === 'link') {
            mobileMenuClose();
        }
    };

    if (mobileData.length > 0) {
    }

    return (
        <div className={classes}>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <div className="mobilemenu__backdrop" onClick={mobileMenuClose} />
            <div className="mobilemenu__body">
                <div className="mobilemenu__header">
                    <div className="mobilemenu__title">Menu</div>
                    <button type="button" className="mobilemenu__close" onClick={mobileMenuClose}>
                        <Cross20Svg />
                    </button>
                </div>
                <div className="mobilemenu__content">
                    {mobileData.length > 0 ? <MobileLinks links={mobileData} onItemClick={handleItemClick} /> : null}
                </div>
            </div>
        </div>
    );
}

export default memo(MobileMenu);
