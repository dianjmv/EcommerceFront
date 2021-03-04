import { ImageBanner } from './imageBanner';
import { IProduct } from './product';
import { IBrand } from './brand';

export interface ISegment {
    id: number;
    code: string;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
    thumbnail: ImageBanner;
    banner: ImageBanner;
    products: IProduct[];
    product_brands: IBrand[];
    level: ILevelUseSegment[];
}
export interface ILevelUseSegment {
    id: number;
    level: number;
    product_brand: IBrand;
}
