import {IProduct} from "../../../../interfaces/product";
import {GetServerSideProps} from "next";

import SitePageNotFound from "../../../../components/site/SitePageNotFound";
import {useAddProducts} from "../../../../store/product/productHooks";
import {useEffect, useState} from "react";
import {getProductsApi} from "../../../../api/products";

import ShopPageBrand from "../../../../components/shop/ShopPageBrand";

import {IBrand} from "../../../../interfaces/brand";
import {getBrandBySlug} from "../../../../api/brands";
import React from "react";
import exp from "constants";

export interface PageProps {
    products: IProduct[] | null;
    brand: IBrand | null;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    let products: IProduct[] | null = [];
    let brand: IBrand | null = null

    if (typeof context.params?.slug === 'string') {
        const {slug} = context.params;
        await getBrandBySlug(slug).then(({data}) => {
            products = data[0].products;
            brand = data[0]
        });
    }

    return {
        props: {
            products,
            brand
        },
    };
};

function Page({products, brand}: PageProps) {
    if (products === null || brand === null) {
        return <SitePageNotFound/>;
    }
    const productsState = useAddProducts();
    const [allProductsList, setProductsList] = useState<IProduct[]>([])
    const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([])
    const ids: number[] = products.map(product => product.id)
    useEffect(() => {
        getProductsApi().then(({data}) => (setProductsList(data)))
    }, [])

    useEffect(() => {
        setCategoryProducts(allProductsList.filter((product) => (ids.includes(product.id)
        )))
    }, [allProductsList])

    useEffect(() => {
        productsState(categoryProducts)
    }, [categoryProducts])

    return <ShopPageBrand columns={3} viewMode="grid" sidebarPosition="start" brand={brand}/>;
}
export default Page;
