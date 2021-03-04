import axios from 'axios';
import BaseRepository from './repository/baseRepository';
import { IContactPetition } from '../interfaces/contact-petition';
const baseUrl = new BaseRepository();
export function sendContactPetition(contactPetition: IContactPetition) {
    const url = `${baseUrl.getBaseUrl()}/contact-requests`;
    return axios.post(url, contactPetition);
}
