import {ImageBanner} from "./imageBanner";
import {IProduct} from "./product";
import {IBanners} from "./banners";

export interface IBrand {
    id: string;
    code: string;
    name: string;
    description: string;
    slug: string;
    created_at: string;
    updated_at: string;
    thumbnail_image: ImageBanner;
    banner_images: ImageBanner[];
    products: IProduct[];
    banners: IBanners[];
    advantages:IAdvantage[];
    url_video: string;
    advantage_image: ImageBanner;
    certificate_images: ImageBanner;
}
export interface IAdvantage{
    id: number;
    advantage: string;
}
