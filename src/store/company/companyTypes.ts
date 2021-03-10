import { ICompanyInfo } from '../../interfaces/company-info';
import { ICatalog } from '../../interfaces/catalog';
import { IBanners } from '../../interfaces/banners';
import { Image } from '../../interfaces/image';
import { ImageBanner } from '../../interfaces/imageBanner';

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
    catalog: any;
    catalog_cover: any;
    banners: any[];
    blog_page_banner: any;
    about_us_banner: any;
    faqs_banner: any;
    privacy_politics_banner: any;
    terms_and_conditions_banner: any;
    devolution: any;
    devolution_banner: any;
    whatsapp_number: string;
    whatsapp_message: string;
    facebook_url: string
    youtube_url: string
}
