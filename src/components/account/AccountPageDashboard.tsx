// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import CurrencyFormat from '../shared/CurrencyFormat';
import url from '../../services/url';

// data stubs
import dataAccountAddresses from '../../data/accountAddresses';
import dataAccountOrders from '../../data/accountOrders';
import theme from '../../data/theme';
import {useCompanyInfo} from '../../store/company/companyHooks';
import React, {useEffect, useState} from 'react';
import {useUserLogged} from '../../store/auth/authHooks';
import OrdersRepository from '../../api/ordersRepository';
import {IOrder, OrdersPaginate} from './AccountPageOrders';
import {ITransactions} from '../../interfaces/transactions';
import {format} from 'date-fns';

export default function AccountPageDashboard() {
    const companyInfo = useCompanyInfo();
    const address = dataAccountAddresses[0];
    const userLogged = useUserLogged();
    const [ordersPaginated, setOrdersPaginated] = useState<OrdersPaginate[]>([]);
    const orderRepository = new OrdersRepository();
    let elementsPerPage = 4;

    useEffect(() => {
        orderRepository.getOrders().then(({data}) => transformToOrder(data));
    }, []);

    function transformToOrder(transactions: ITransactions[]) {
        let orders = [];

        for (let transaction of transactions) {
            if (transaction.user.id === userLogged.userLogged?.user.id) {
                let quantity = 0;
                for (let product of transaction.products) {
                    quantity = quantity + product.quantity;
                }
                let data = {
                    id: transaction.id,
                    quantity: quantity,
                    total_price: transaction.total_price,
                    created_at: transaction.created_at,
                };
                orders.push(data);
            }
        }
        paginateOrders(orders);
    }

    function paginateOrders(data: IOrder[]) {
        let listOrders = [];
        let pageNumber = 1;
        for (let i = 0; i < data.length; i += elementsPerPage) {
            let page = data.slice(i, i + elementsPerPage);
            const pagePaginated = {
                page: pageNumber,
                orders: page,
            };
            listOrders.push(pagePaginated);
            pageNumber = pageNumber + 1;
        }
        return setOrdersPaginated(listOrders);
    }

    const imageAvatar = () => {
        if (userLogged.userLogged?.user.avatar) {
            return (
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URI}${userLogged.userLogged.user.avatar.url}`}
                    alt=""
                    className={'w-full h-full'}
                />
            );
        } else {
            return <img src="/images/avatars/avatar-3.jpg" alt=""/>;
        }
    };
    const orders = ordersPaginated.map(orderPaginated => {
        return orderPaginated.orders.map((order, index) =>
            index < 3 ? (
                <tr key={order.id}>
                    <td>
                        <AppLink href={url.accountOrder({id: 5})}>#{order.id}</AppLink>
                    </td>
                    <td>{format(new Date(order.created_at), 'YYY-mm-dd')}</td>

                    <td>
                        <CurrencyFormat value={order.total_price}/> por {order.quantity} item(s)
                    </td>
                </tr>
            ) : null
        );
    });

    return (
        <div className="dashboard">
            <Head>
                <title>{companyInfo !== undefined ? `${companyInfo.company_name} | Mi Cuenta` : null}</title>
            </Head>

            <div className="dashboard__profile card profile-card">
                <div className="card-body profile-card__body">
                    <div className="profile-card__avatar">{imageAvatar()}</div>
                    <div className="profile-card__name">
                        {userLogged.userLogged?.user.first_name} {userLogged.userLogged?.user.last_name}
                    </div>
                    <div className="profile-card__email">{userLogged.userLogged?.user.email}</div>
                    <div className="profile-card__edit">
                        <AppLink href={url.accountProfile()} className="btn btn-secondary btn-sm">
                            Editar Perfil
                        </AppLink>
                    </div>
                </div>
            </div>
            {/*<div className="dashboard__address card address-card address-card--featured">*/}
            {/*    {address.default && <div className="address-card__badge">Default Address</div>}*/}
            {/*    <div className="address-card__body">*/}
            {/*        <div className="address-card__name">{`${address.firstName} ${address.lastName}`}</div>*/}
            {/*        <div className="address-card__row">*/}
            {/*            {address.country}*/}
            {/*            <br />*/}
            {/*            {address.postcode}*/}
            {/*            ,*/}
            {/*            {address.city}*/}
            {/*            <br />*/}
            {/*            {address.address}*/}
            {/*        </div>*/}
            {/*        <div className="address-card__row">*/}
            {/*            <div className="address-card__row-title">Phone Number</div>*/}
            {/*            <div className="address-card__row-content">{address.phone}</div>*/}
            {/*        </div>*/}
            {/*        <div className="address-card__row">*/}
            {/*            <div className="address-card__row-title">Email Address</div>*/}
            {/*            <div className="address-card__row-content">{address.email}</div>*/}
            {/*        </div>*/}
            {/*        <div className="address-card__footer">*/}
            {/*            <AppLink href={url.accountAddress({ id: 5 })}>Edit Address</AppLink>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="dashboard__orders card">
                <div className="card-header">
                    <h5>Recent Orders</h5>
                </div>
                <div className="card-divider"/>
                <div className="card-table">
                    <div className="table-responsive-sm">
                        <table>
                            <thead>
                            <tr>
                                <th>Orden</th>
                                <th>Fecha</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>{orders}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
