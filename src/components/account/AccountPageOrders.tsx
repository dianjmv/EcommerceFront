// react
import React, {useEffect, useState} from 'react';

// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import CurrencyFormat from '../shared/CurrencyFormat';
import Pagination from '../shared/Pagination';
import url from '../../services/url';

// data stubs
import dataAccountOrders from '../../data/accountOrders';
import theme from '../../data/theme';
import {ITransactions} from "../../interfaces/transactions";
import OrdersRepository from "../../api/ordersRepository";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import {IProduct} from "../../interfaces/product";
import {useCompanyInfo} from "../../store/company/companyHooks";
import {useUserLogged} from "../../store/auth/authHooks";
export interface IOrder{
    id: number;
    quantity:number;
    total_price: number;
    created_at: string;
}

export interface OrdersPaginate {
    page: number;
    orders: IOrder[]
}
function AccountPageOrders() {
    const [page, setPage] = useState(1);
    const [transactions, setTransactions]= useState<ITransactions[]>([])
    const [ordersPaginated, setOrdersPaginated]= useState<OrdersPaginate[]>([])
    const orderRepository = new OrdersRepository()
    let elementsPerPage = 4
    const companyInfo = useCompanyInfo();
    const userLogged = useUserLogged()

    useEffect(()=>{
        orderRepository.getOrders().then(({data})=>transformToOrder(data))
    },[])

    function transformToOrder(transactions: ITransactions[]){
        let orders =[];
        for (let transaction of transactions){
            if (transaction.user.id === userLogged.userLogged?.user.id){
                let quantity = 0;
                for (let product of transaction.products){
                    quantity = quantity+ product.quantity
                }
                let data ={
                    id: transaction.id,
                    quantity : quantity,
                    total_price: transaction.total_price,
                    created_at: transaction.created_at,
                }
                orders.push(data)
            }
        }
        paginateOrders(orders)
    }

    function paginateOrders(data: IOrder[]) {
        let listOrders = []
        let pageNumber = 1
        for (let i = 0; i < data.length; i += elementsPerPage) {
            let page = data.slice(i, i + elementsPerPage);
            const pagePaginated = {
                page: pageNumber,
                orders: page
            }
            listOrders.push(pagePaginated);
            pageNumber = pageNumber + 1;
        }
        return (setOrdersPaginated(listOrders))
    }



    const ordersList = ordersPaginated.map((paginated) => {
        console.log(paginated)
        if (paginated.page === page) {
            return(
                paginated.orders.map((order)=>(<tr key={order.id}>
                    <td>
                        <AppLink href={url.accountOrder(order)}>{`#${order.id}`}</AppLink>
                    </td>
                    <td>{format(new Date(order.created_at), 'YYY-mm-dd') }</td>
                    <td>
                        <CurrencyFormat value={order.total_price} />
                        {' '}
                        por
                        {' '}
                        {order.quantity}
                        {' '}
                        item(s)
                    </td>
                </tr>))
            )
        }
    });
    const noItems = ()=>(
        <div className={'text-center'}>
            <p className={'text-xl py-2'}>Aún no tiene ordenes</p>
            <AppLink href={'/shop'}>Realiza tu primera compra aquí </AppLink>
        </div>
    )

    return (
        <div className="card">
            <Head>
                <title>{companyInfo !== undefined ? `${companyInfo.company_name} | Ordenes` : null}</title>
            </Head>

            <div className="card-header">
                <h5>Historial de Ordenes</h5>
            </div>
            <div className="card-divider" />
            {
                ordersPaginated.length>0?
                    <div>
                        <div className="card-table">
                            <div className="table-responsive-sm">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Orden Nº</th>
                                        <th>Fecha</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {ordersList}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-divider" />
                        <div className="card-footer">
                            <Pagination current={page} total={ordersPaginated.length} onPageChange={setPage} />
                        </div>
                    </div>:
                    noItems()
            }

        </div>
    );
}

export default AccountPageOrders;
