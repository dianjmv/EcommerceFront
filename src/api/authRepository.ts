import BaseRepository from "./repository/baseRepository";
import axios from "axios";
import {IUser, IUserLogged, IUserLogin, IUserRegister} from "../interfaces/user";

class AuthRepository {
    private baseUrl = new BaseRepository();

    public login(userLogin: IUserLogin) {
        const user = {
            identifier: userLogin.email,
            password: userLogin.password
        }
        const url = `${this.baseUrl.getBaseUrl()}/auth/local`
        return axios.post<IUserLogged>(url, user)
    }

    public register(userRegister: IUserRegister) {
        const url = `${this.baseUrl.getBaseUrl()}/auth/local/register`
        return axios.post<IUserLogged>(url, userRegister)
    }

    public me(id:number) {
        const url = `${this.baseUrl.getBaseUrl()}/users/${id}`
        return axios.get<IUser>(url, {headers:{'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
    }

    public uploadUser(user: IUser, imageID: number | null) {
        let data ={}
        if (imageID !== null){
            data = {
                "last_name": user.last_name,
                "username": user.username,
                "avatar": imageID,
                "first_name": user.first_name,
                "phone_number": user.phone_number,
                "email": user.email,
                "confirmed": true
            }

        }else {
            data = {
                "last_name": user.last_name,
                "username": user.username,
                "first_name": user.first_name,
                "phone_number": user.phone_number,
                "email": user.email,
                "confirmed": true
            }
        }

        const url = `${this.baseUrl.getBaseUrl()}/users/${user.id}`
        return axios.put(url, data, {headers:{'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
    }

    public resetPassword(password:string, id:number){
        const url = `${this.baseUrl.getBaseUrl()}/users/${id}`
        return axios.put(url, {password:password}, {headers:{'Authorization': `Bearer ${localStorage.getItem('access_token')}` }})
    }

}

export default AuthRepository;
