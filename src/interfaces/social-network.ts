import {IBanners} from "./banners";

export interface SocialNetwork{
    id: number;
    tittle: string;
    link: string;
    company_information: number;
    icon_class: string;
    created_at: string;
    updated_at: string;
    image: IBanners
}
