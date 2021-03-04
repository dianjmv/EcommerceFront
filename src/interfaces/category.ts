import { ICustomFields } from './custom-fields';
import {ImageBanner} from "./imageBanner";
import {IProduct} from "./product";

export interface IBaseCategory {
    type: string;
    id: number;
    code:string;
    slug: string;
    name: string;
    description: string;
    parent_category?: IBaseCategory[];
    created_at: string;
    updated_at: string;
    thumbnail_image: ImageBanner;
    banner: ImageBanner;
    icon: ImageBanner;
    products: IProduct[];
}

export interface IShopCategory extends IBaseCategory {
    type: 'shop';
}

export interface IBlogCategory extends IBaseCategory {
    type: 'blog';
}

export type ICategory = IShopCategory | IBlogCategory;
