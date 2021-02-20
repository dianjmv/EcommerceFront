import {IProduct} from "../../../interfaces/product";
import {GetServerSideProps} from "next";

import SitePageNotFound from "../../../components/site/SitePageNotFound";

import {IBrand} from "../../../interfaces/brand";

import {useAddProducts, useProductsAvailable} from "../../../store/product/productHooks";
import React, {Fragment, useEffect, useMemo, useState} from "react";

import Head from "next/head";
import BlockSlideShow from "../../../components/blocks/BlockSlideShow";
import BlockProducts from "../../../components/blocks/BlockProducts";
import AppLink from "../../../components/shared/AppLink";

import ContactForm from "../../../components/contact/ContactForm";
// @ts-ignore
import ResponsiveEmbed from "react-responsive-embed";
import BaseRepository from "../../../api/repository/baseRepository";
import BrandsRepository from "../../../api/brandsRepository";
import ProductsRepository from "../../../api/productsRepository";
import {useRouter} from "next/router";
import {useCompanyInfo} from "../../../store/company/companyHooks";
import {useResetFilters} from "../../../store/filter/filterHooks";

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

    if (products === null || brand == null) {
        return <SitePageNotFound/>;
    }
    const router = useRouter();
    const companyInfo = useCompanyInfo();
    const productsState = useAddProducts();
    const resetFilters = useResetFilters();
    const [allProductsList, setProductsList] = useState<IProduct[]>([])
    const [brandProducts, setBrandProducts] = useState<IProduct[]>([])
    let ids: number[] = products.map(product => product.id)
    const productsRepository = new ProductsRepository()
    const [actualBrand, setActualBrand] = useState<IBrand>()
    // @ts-ignore
    const {slug}:string = router.query
    const brandsRepository = new BrandsRepository()

    useEffect(()=>{
        productsRepository.getAllProducts().then(({data}) => (setProductsList(data)))
        resetFilters()
        brandsRepository.getBrandBySlug(slug).then(({data}) => {
            ids = data[0].products.map(product => product.id);
            setActualBrand(data[0])
        })
        productsRepository.getAllProducts().then(({data}) => (setProductsList(data)))
        setBrandProducts(allProductsList.filter((product) => (ids.includes(product.id)
        )))
        productsState(brandProducts)
    }, [brand])
    useEffect(()=>{
        productsRepository.getAllProducts().then(({data}) => (setProductsList(data)))
        console.log('1', allProductsList)
        resetFilters()
        brandsRepository.getBrandBySlug(slug).then(({data}) => {
            ids = data[0].products.map(product => product.id);
            setActualBrand(data[0])
        })
        console.log('2  ', allProductsList)


        productsRepository.getAllProducts().then(({data}) => (setProductsList(data)))
        setBrandProducts(allProductsList.filter((product) => (ids.includes(product.id)
        )))
        console.log('paospdoad', allProductsList)
        console.log('ids', ids)
        console.log('brand products', brandProducts)
        productsState(brandProducts)
    }, [])

    useEffect(() => {
        productsRepository.getAllProducts().then(({data}) => (setProductsList(data)))

    }, [])

    useEffect(() => {
        setBrandProducts(allProductsList.filter((product) => (ids.includes(product.id)
        )))
    }, [allProductsList])

    useEffect(() => {
        productsState(brandProducts)
    }, [brandProducts])


    return (
        <>
            <Head>
                <title>{companyInfo !== undefined ? companyInfo.company_name : null} | {actualBrand? actualBrand.name:brand.name}</title>
            </Head>

            {useMemo(() => <BlockSlideShow banners={brand?.banners}/>, [])}
            <div className={'grid grid-cols-1 text-center items-center content-center my-4 container'}>
                <img className={'mx-auto'} src={`${process.env.NEXT_PUBLIC_BASE_URI}${brand.thumbnail_image.url}`}
                     alt=""/>
                <p className={'px-10 '}>{brand.description}</p>

            </div>

            {useMemo(() => (
                <BlockProducts
                    title={`Productos de ${brand?.name}`}
                    layout="large-first"
                    products={brandProducts}
                />
            ), [brandProducts])}
            <div className={'grid grid-cols-1 container'}>
                <AppLink className={'btn btn-primary mx-auto'} href={`/shop/brands/products/${brand.slug}/`}>
                    Todos los productos
                </AppLink>



                <div className={'my-4'}>
                    <ResponsiveEmbed src={brand.url_video} allowFullScreen/>
                </div>
            </div>
            <div className={'grid md:grid-cols-3 grid-cols-1 container md:gap-y-6 gap-y-4 my-10'}>
                <div className={'col-start-1 md:col-span-3'}>
                    <h2 className={'text-2xl font-bold border-b border-gray-200 pb-1'}>¿Que ventajas ofrecemos?</h2>
                </div>
                <div className={'md:col-start-1 md:col-span-2 '}>
                    <ul className={'pl-2 mb-4'}>
                        {brand.advantages.map(({advantage, id}) => (
                            <li className={'my-2'} key={id}>- {advantage}</li>))}
                    </ul>
                    <img className={'mx-auto'}
                         src={`${process.env.NEXT_PUBLIC_BASE_URI}${brand.certificate_images.url}`} alt=""/>

                </div>
                <div className={'md:col-start-3'}>
                    <img src={`${process.env.NEXT_PUBLIC_BASE_URI}${brand.advantage_image.url}`} alt=""/>
                </div>

            </div>

            <ContactForm/>

        </>
    );
}

export default Page;
