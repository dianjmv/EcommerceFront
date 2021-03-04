import BaseRepository from "./repository/baseRepository";
import axios from "axios";

import {ITransactions} from "../interfaces/transactions";

class OrdersRepository{
    private baseUrl = new BaseRepository();
    public getOrders(){
        const url = `${this.baseUrl.getBaseUrl()}/transactions`;
        return axios.get<ITransactions[]>(url, {headers:{'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
    }

    public getOrdersById(id:number){
        const url = `${this.baseUrl.getBaseUrl()}/transactions/${id}`;
        return axios.get<ITransactions>(url, {headers:{'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
    }
}
export default OrdersRepository;
