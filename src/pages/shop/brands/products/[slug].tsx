import {IProduct} from "../../../../interfaces/product";
import {GetServerSideProps} from "next";

import SitePageNotFound from "../../../../components/site/SitePageNotFound";
import {useAddProducts} from "../../../../store/product/productHooks";
import {useEffect, useState} from "react";


import ShopPageBrand from "../../../../components/shop/ShopPageBrand";

import {IBrand} from "../../../../interfaces/brand";

import React from "react";
import exp from "constants";
import BrandsRepository from "../../../../api/brandsRepository";
import ProductsRepository from "../../../../api/productsRepository";
import {useAddFilterProduct} from "../../../../store/filter/filterHooks";

export interface PageProps {
    products: IProduct[] | null;
    brand: IBrand | null;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    let products: IProduct[] | null = [];
    let brand: IBrand | null = null
    const brandsRepository = new BrandsRepository()

    if (typeof context.params?.slug === 'string') {
        const {slug} = context.params;
        await brandsRepository.getBrandBySlug(slug).then(({data}) => {
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
    const productsRepository = new ProductsRepository()
    const addFilter = useAddFilterProduct();
    useEffect(() => {
        productsRepository.getAllProducts().then(({data}) => (setProductsList(data)))
    }, [brand])

    useEffect(() => {
        setCategoryProducts(allProductsList.filter((product) => (ids.includes(product.id)
        )))
    }, [allProductsList])

    useEffect(() => {
        productsState(categoryProducts)
        addFilter({
            type:'brands',
            slug:brand.slug,
            value:true
        })
    }, [categoryProducts])

    return <ShopPageBrand columns={4} viewMode="grid" brand={brand}/>;
}
export default Page;
