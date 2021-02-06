import {IProduct} from "../../../interfaces/product";
import {GetServerSideProps} from "next";
import {getProductBySlug, getProductsApi} from "../../../api/products";
import SitePageNotFound from "../../../components/site/SitePageNotFound";
import ShopPageProduct from "../../../components/shop/ShopPageProduct";
import {getSegmentBySlug} from "../../../api/segments";
import ShopPageCategory from "../../../components/shop/ShopPageCategory";
import {useAddProducts, useProductsAvailable} from "../../../store/product/productHooks";
import {useEffect, useState} from "react";


export interface PageProps {
    products: IProduct[] | null;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    let products: IProduct[] | null = null;

    if (typeof context.params?.slug === 'string') {
        const {slug} = context.params;
        await getSegmentBySlug(slug).then(({data}) => (products = data[0].products)).catch(err => (console.error(err.message)));

    }
    return {
        props: {
            products,
        },
    };
};

function Page({products}: PageProps) {
    if (products === null) {
        return <SitePageNotFound/>;
    }
    const productsState = useAddProducts();
    const [allProductsList, setProductsList] = useState<IProduct[]>([])
    const [segmentProducts, setSegmentProducts] = useState<IProduct[]>([])
    const ids: number[] = products.map(product => product.id)
    useEffect(() => {
        getProductsApi().then(({data}) => (setProductsList(data)))
    }, [])

    useEffect(() => {
        setSegmentProducts(allProductsList.filter((product) => (ids.includes(product.id)
        )))
    }, [allProductsList])

    useEffect(() => {
        productsState(segmentProducts)
    }, [segmentProducts])

    return <ShopPageCategory columns={3} viewMode="grid" sidebarPosition="start"/>;
}

export default Page;
