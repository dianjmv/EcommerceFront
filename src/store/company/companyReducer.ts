import { CompanyInfoState } from './companyTypes';
import { COMPARE_ADD_ITEM, COMPARE_REMOVE_ITEM, CompareAction } from '../compare/compareActionTypes';
import { COMPANY_ADD_INFO, COMPANY_GET_INFO, CompanyAddInfoAction } from './companyActionsType';
import { ICompanyInfo } from '../../interfaces/company-info';
import { withClientState } from '../client';
import { any } from 'prop-types';

function addInfo(state: CompanyInfoState, infoCompany: ICompanyInfo): CompanyInfoState {
    return {
        ...infoCompany,
    };
}

const initialState: CompanyInfoState = {
    id: 0,
    company_name: '',
    politics: '',
    terms_and_conditions: '',
    faq: '',
    about_us: '',
    phone_contact: '',
    store_address: '',
    email_contact: '',
    created_at: '',
    updated_at: '',
    logo: [],
    social_networks: [],
    banners: [],
    catalog: [],
    catalog_cover: [],
    blog_page_banner: '',
    about_us_banner: '',
    faqs_banner: '',
    privacy_politics_banner: '',
    terms_and_conditions_banner: '',
    devolution: '',
    devolution_banner: '',
    whatsapp_message: '',
    whatsapp_number: '',
    facebook_url: '',
    youtube_url: '',
};
export const COMPANY_INFO_NAMESPACE = 'companyInfo';

function companyInfoBaseReducer(state = initialState, action: CompanyAddInfoAction) {
    switch (action.type) {
        case COMPANY_ADD_INFO:
            return addInfo(state, action.companyInfo);
        default:
            return state;
    }
}

const companyInfoReducer = withClientState(companyInfoBaseReducer, COMPANY_INFO_NAMESPACE);

export default companyInfoReducer;
