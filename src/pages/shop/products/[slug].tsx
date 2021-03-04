// third-party
import { GetServerSideProps } from 'next';
// application

import ShopPageProduct from '../../../components/shop/ShopPageProduct';
import SitePageNotFound from '../../../components/site/SitePageNotFound';
import { IProduct } from '../../../interfaces/product';
import ProductsRepository from '../../../api/productsRepository';

export interface PageProps {
    product: IProduct | null;
}

export interface PageProps {
    product: IProduct | null;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
    let product: IProduct | null = null;
    const productsRepository = new ProductsRepository();
    if (typeof context.params?.slug === 'string') {
        const { slug } = context.params;
        await productsRepository.getProductBySlug(slug).then(({ data }) => (product = data[0]));
    }
    return {
        props: {
            product,
        },
    };
};

function Page({ product }: PageProps) {
    if (product === null) {
        return <SitePageNotFound />;
    }

    return <ShopPageProduct product={product} layout="sidebar" />;
}

export default Page;
