import {ImageBanner} from "./imageBanner";
import {IProduct} from "./product";

export interface ISegment{
    id: number;
    code: string;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
    thumbnail: ImageBanner;
    banner: ImageBanner[];
    products: IProduct[];
}
