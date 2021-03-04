// react
import { MouseEvent as ReactMouseEvent, useCallback, useEffect, useMemo, useState } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import { useRouter } from 'next/router';
import Megamenu from './Megamenu';
import Menu from './Menu';
import { useDirection } from '../../store/locale/localeHooks';

// data stubs
import HeaderNavigationData from '../../data/headerNavigation';
import { INav } from '../../interfaces/menus/nav';

function NavLinks() {
    const direction = useDirection();
    const headerNav = new HeaderNavigationData();
    const [dataHeaderNavigation, setDataHeaderNavigation] = useState<INav>([]);

    useEffect(() => getNavHeader(), []);

    function getNavHeader() {
        headerNav.getDataHeaderNavigation().then(data => setDataHeaderNavigation(data));
    }

    if (dataHeaderNavigation.length > 0) {
        const handleMouseEnter = (event: ReactMouseEvent) => {
            const item = event.currentTarget as HTMLElement;
            const megamenu = item.querySelector('.nav-links__megamenu') as HTMLElement;

            if (megamenu) {
                const container = megamenu.offsetParent;
                const containerWidth = container!.getBoundingClientRect().width;
                const megamenuWidth = megamenu.getBoundingClientRect().width;
                const itemOffsetLeft = item.offsetLeft;

                if (direction === 'rtl') {
                    const itemPosition = containerWidth - (itemOffsetLeft + item.getBoundingClientRect().width);

                    const megamenuPosition = Math.round(Math.min(itemPosition, containerWidth - megamenuWidth));

                    megamenu.style.left = '';
                    megamenu.style.right = `${megamenuPosition}px`;
                } else {
                    const megamenuPosition = Math.round(Math.min(itemOffsetLeft, containerWidth - megamenuWidth));

                    megamenu.style.right = '';
                    megamenu.style.left = `${megamenuPosition}px`;
                }
            }
        };

        const linksList = dataHeaderNavigation.map((item, index) => {
            let arrow;
            let submenu;
            if (item.submenu && item.submenu.type === 'menu') {
                submenu = (
                    <div className="nav-links__menu">
                        <Menu items={item.submenu.menu} />
                    </div>
                );
            }

            if (item.submenu && item.submenu.type === 'megamenu') {
                submenu = (
                    <div className={`nav-links__megamenu nav-links__megamenu--size--${item.submenu.menu.size}`}>
                        <Megamenu menu={item.submenu.menu} />
                    </div>
                );
            }

            const classes = classNames('nav-links__item', {
                'nav-links__item--with-submenu': item.submenu,
            });
            const router = useRouter();
            return (
                <li key={index} className={classes} onMouseEnter={handleMouseEnter}>
                    <AppLink href={item.url} {...item.props}>
                        <span>
                            {item.title}
                            {arrow}
                        </span>
                        {router.pathname === item.url ? <div className={'nav-links__item__active'}></div> : null}
                    </AppLink>
                    {submenu}
                </li>
            );
        });
        return <ul className="nav-links__list">{linksList}</ul>;
    } else return null;
}

export default NavLinks;
