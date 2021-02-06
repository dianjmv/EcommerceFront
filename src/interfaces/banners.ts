import {ImageBanner} from "./imageBanner";

export interface ILinkPurchase {
    id: number,
    text_link: string,
    orientation: string,
    link: string,
    button_color: string,
}

export interface IBanners {
    id: number,
    created_at: string,
    updated_at: string,
    image_full: ImageBanner,
    image_classic: ImageBanner,
    image_mobile: ImageBanner
    link_purchase: ILinkPurchase

}
