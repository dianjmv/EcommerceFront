import {IBanners} from "./banners";
import {IProduct} from "./product";
import {ImageBanner} from "./imageBanner";

export interface IPost {
    id: number;
    title: string;
    categories: string[];
    description: string;
    content: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    slug: string
    thumbnails: ImageBanner;
    presentation: ImageBanner;
    blog_categories: string[]
    products: IProduct[]
    related_posts: IPost[]
}
