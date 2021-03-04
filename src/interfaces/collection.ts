import { ImageBanner } from './imageBanner';

export interface ICollection {
    id: number;
    code: string;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
    Miniatura: ImageBanner;
    Banner: ImageBanner[];
}
