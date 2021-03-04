import BaseRepository from "./repository/baseRepository";
import axios from "axios";
import {ITransactions} from "../interfaces/transactions";

class MailingRepository{
    private baseUrl = new BaseRepository();

    public saveMailForSubscription(email:string){
        const url = `${this.baseUrl.getBaseUrl()}/mailings`;
        const data={
            email:email
        }
        return axios.post<any>(url, data)
    }

}
export default MailingRepository;
