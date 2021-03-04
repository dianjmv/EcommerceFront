import { ImageBanner } from './imageBanner';

export interface IVariant {
    id: number;
    price: number;
    sale_price: number;
    color: string;
    size: number;
    images: ImageBanner[];
}
