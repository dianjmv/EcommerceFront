// react
import React, { ReactNode, Fragment } from 'react';

// third-party
import classNames from 'classnames';
import { useRouter } from 'next/router';

// application
import AppLink from '../shared/AppLink';
import PageHeader from '../shared/PageHeader';
import url from '../../services/url';
import {useUserLogged} from "../../store/auth/authHooks";
import SitePageNotFound from "../site/SitePageNotFound";

export interface AccountLayoutProps {
    children?: ReactNode;
}

function AccountLayout(props: AccountLayoutProps) {
    const { children } = props;
    const router = useRouter();
    const userLogged= useUserLogged()

    const breadcrumb = [
        { title: 'Inicio', url: url.home() },
        { title: 'Mi Cuenta', url: url.accountDashboard() },
    ];

    const items = [
        { title: 'Panel Principal', link: url.accountDashboard() },
        { title: 'Editar Perfil', link: url.accountProfile() },
        { title: 'Historial de Ordenes', link: url.accountOrders() },
        // { title: 'Order Details', link: url.accountOrder({ id: 5 }) },
        // { title: 'Addresses', link: url.accountAddresses() },
        // { title: 'Edit Address', link: url.accountAddress({ id: 5 }) },
        { title: 'Cambio de Contraseña', link: url.accountPassword() },
        { title: 'Cerrar Sesión', link: url.accountSignIn() },
    ].map((item, index) => {
        const isActive = router.pathname === item.link.href;
        const classes = classNames('account-nav__item', {
            'account-nav__item--active': isActive,
        });

        return (
            <li key={index} className={classes}>
                <AppLink href={item.link}>{item.title}</AppLink>
            </li>
        );
    });
    if (userLogged.userLogged?.user){

    return (
        <Fragment>
            <PageHeader header="Mi Cuenta" breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3 d-flex">
                            <div className="account-nav flex-grow-1">
                                <h4 className="account-nav__title">Navegación</h4>
                                <ul>{items}</ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 mt-4 mt-lg-0">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );}
    else {
        return <SitePageNotFound/>
    }
}

export default AccountLayout;
