import {ImageBanner} from "./imageBanner";

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
}
