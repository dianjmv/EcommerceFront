import React from 'react';
import { GetServerSideProps } from 'next';
import { IProduct } from '../../../interfaces/product';

import { PageProps } from '../products/[slug]';

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
    let product: IProduct | null = null;

    if (typeof context.params?.slug === 'string') {
        const { slug } = context.params;
    }

    return {
        props: {
            product,
        },
    };
};

const ProductDetail = () => {
    return <h1>Producto</h1>;
};
export default ProductDetail;
