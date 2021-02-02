import {ICompanyInfo} from "../../interfaces/company-info";
import {ICatalog} from "../../interfaces/catalog";
import {IBanners} from "../../interfaces/banners";
import {Image} from "../../interfaces/image";

export interface CompanyInfoState {
    id: number;
    company_name: string;
    politics: string;
    terms_and_conditions: string;
    faq: string;
    about_us: string;
    phone_contact: string;
    store_address: string;
    email_contact: string;
    created_at: string;
    updated_at: string;
    logo: any;
    social_networks: any[];
    catalog: ICatalog;
    catalog_cover: Image
}
