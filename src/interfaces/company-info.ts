import {SocialNetwork} from "./social-network";
import {IBanners} from "./banners";
import {ICatalog} from "./catalog";
import {Image} from "./image";
import {ImageBanner} from "./imageBanner";

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
    banners: IBanners[];
    blog_page_banner: IBanners;
    about_us_banner: ImageBanner
    faqs_banner: ImageBanner
    privacy_politics_banner: ImageBanner
    terms_and_conditions_banner: ImageBanner
    devolution:string;
    devolution_banner:ImageBanner
}
