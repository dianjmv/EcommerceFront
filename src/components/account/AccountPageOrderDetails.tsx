// react
import {Fragment, useEffect, useState} from 'react';

// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import url from '../../services/url';

// data stubs
import theme from '../../data/theme';
import {useRouter} from "next/router";
import OrdersRepository from "../../api/ordersRepository";
import {ITransactions} from "../../interfaces/transactions";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import SitePageNotFound from "../site/SitePageNotFound";

export default function AccountPageOrderDetails() {
    const router = useRouter()
    const orderRepository = new OrdersRepository()
    const [order, setOrder] = useState<ITransactions>()
    useEffect(()=>{
        orderRepository.getOrdersById(parseInt(router.query.orderId as string)).then(({data})=>(setOrder(data)))

    },[router.query])

    if (order){
        return (

            <Fragment>
                <Head>
                    <title>{`SouthImport | Detalle de la Orden`}</title>
                </Head>

                <div className="card">
                    <div className="order-header">
                        <div className="order-header__actions">
                            <AppLink href={url.accountOrders()} className="btn btn-xs btn-secondary">
                                Regresar a la lista
                            </AppLink>
                        </div>
                        <h5 className="order-header__title">Orden #{order?.id}</h5>
                        <div className="order-header__subtitle">
                            Fue colocado en
                            {' '}
                            <mark className="order-header__date">{format(new Date(order?.created_at), 'YYY-mm-dd')}</mark>
                            {' '}
                            .
                        </div>
                    </div>
                    <div className="card-divider" />
                    <div className="card-table">
                        <div className="table-responsive-sm">
                            <table>
                                <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                                <tbody className="card-table__body card-table__body--merge-rows">
                                {
                                    order.products.map((productOrder => (<tr>
                                        <td>{productOrder.product.title} × {productOrder.quantity}</td>
                                        <td>${(productOrder.quantity* productOrder.product.sale_price).toFixed(2)}</td>
                                    </tr>)))
                                }
                                </tbody>
                                {/*<tbody className="card-table__body card-table__body--merge-rows">*/}
                                {/*<tr>*/}
                                {/*    <th>Subtotal</th>*/}
                                {/*    <td>$5,877.00</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <th>Store Credit</th>*/}
                                {/*    <td>$-20.00</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <th>Shipping</th>*/}
                                {/*    <td>$25.00</td>*/}
                                {/*</tr>*/}
                                {/*</tbody>*/}
                                <tfoot>
                                <tr>
                                    <th>Total</th>
                                    <td>${order.total_price}</td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                {/*<div className="row mt-3 no-gutters mx-n2">*/}
                {/*    <div className="col-sm-6 col-12 px-2">*/}
                {/*        <div className="card address-card address-card--featured">*/}
                {/*            <div className="address-card__body">*/}
                {/*                <div className="address-card__badge address-card__badge--muted">Shipping Address</div>*/}
                {/*                <div className="address-card__name">Helena Garcia</div>*/}
                {/*                <div className="address-card__row">*/}
                {/*                    Random Federation*/}
                {/*                    <br />*/}
                {/*                    115302, Moscow*/}
                {/*                    <br />*/}
                {/*                    ul. Varshavskaya, 15-2-178*/}
                {/*                </div>*/}
                {/*                <div className="address-card__row">*/}
                {/*                    <div className="address-card__row-title">Phone Number</div>*/}
                {/*                    <div className="address-card__row-content">38 972 588-42-36</div>*/}
                {/*                </div>*/}
                {/*                <div className="address-card__row">*/}
                {/*                    <div className="address-card__row-title">Email Address</div>*/}
                {/*                    <div className="address-card__row-content">stroyka@example.com</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">*/}
                {/*        <div className="card address-card address-card--featured">*/}
                {/*            <div className="address-card__body">*/}
                {/*                <div className="address-card__badge address-card__badge--muted">Billing Address</div>*/}
                {/*                <div className="address-card__name">Helena Garcia</div>*/}
                {/*                <div className="address-card__row">*/}
                {/*                    Random Federation*/}
                {/*                    <br />*/}
                {/*                    115302, Moscow*/}
                {/*                    <br />*/}
                {/*                    ul. Varshavskaya, 15-2-178*/}
                {/*                </div>*/}
                {/*                <div className="address-card__row">*/}
                {/*                    <div className="address-card__row-title">Phone Number</div>*/}
                {/*                    <div className="address-card__row-content">38 972 588-42-36</div>*/}
                {/*                </div>*/}
                {/*                <div className="address-card__row">*/}
                {/*                    <div className="address-card__row-title">Email Address</div>*/}
                {/*                    <div className="address-card__row-content">stroyka@example.com</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </Fragment>
        );
    }else {
        return (<SitePageNotFound/>)
    }


}
