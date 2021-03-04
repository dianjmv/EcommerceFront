import {IProduct} from "../../../interfaces/product";
import {GetServerSideProps} from "next";
import ProductsRepository from "../../../api/productsRepository";
import SitePageNotFound from "../../../components/site/SitePageNotFound";

import {useAddProducts, useProductsAvailable} from "../../../store/product/productHooks";
import {useEffect, useState} from "react";
import ShopPageSegment from "../../../components/shop/ShopPageSegment";
import {ISegment} from "../../../interfaces/segment";
import SegmentRepository from "../../../api/segmentRepository";
import {useAddFilterProduct, useResetFilters} from "../../../store/filter/filterHooks";


export interface PageProps {
    products: IProduct[] | null;
    segment: ISegment[] | null;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    let products: IProduct[] | null = null;
    let segment: ISegment[] | null = null;
    const segmentsRepository = new SegmentRepository()

    if (typeof context.params?.slug === 'string') {
        const {slug} = context.params;
        await segmentsRepository.getSegmentBySlug(slug).then(({data}) => {
            segment = data;
            products = data[0].products;
        }).catch(err => (console.error(err.message)));

    }
    return {
        props: {
            products,
            segment,
        },
    };
};

function Page({products, segment}: PageProps) {
    if (products === null || segment === null) {
        return <SitePageNotFound/>;
    }
    const productsState = useAddProducts();
    const [allProductsList, setProductsList] = useState<IProduct[]>([])
    const [segmentProducts, setSegmentProducts] = useState<IProduct[]>([])
    const ids: number[] = products.map(product => product.id)
    const productsRepository = new ProductsRepository()
    const addFilter = useAddFilterProduct()
    const resetFilters = useResetFilters()
    useEffect(() => {
        productsRepository.getAllProducts().then(({data}) => (setProductsList(data)))
        resetFilters()
        addFilter({
            type:'segments',
            slug:segment[0].slug,
            value:true
        })
    }, [segment])

    useEffect(() => {
        setSegmentProducts(allProductsList.filter((product) => (ids.includes(product.id)
        )))
    }, [allProductsList])

    useEffect(() => {
        productsState(segmentProducts)
    }, [segmentProducts])



    return <ShopPageSegment columns={4} viewMode="grid" segment={segment}/>;
}

export default Page;
