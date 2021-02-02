import {SocialNetwork} from "./social-network";
import {IBanners} from "./banners";
import {ICatalog} from "./catalog";
import {Image} from "./image";

export interface ICompanyInfo{
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
    logo: IBanners[];
    social_networks: SocialNetwork[];
    catalog: ICatalog;
    catalog_cover: Image;
}
