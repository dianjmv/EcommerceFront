import {IProduct} from "../../../interfaces/product";
import {GetServerSideProps} from "next";

import SitePageNotFound from "../../../components/site/SitePageNotFound";

import {IBrand} from "../../../interfaces/brand";

import {useAddProducts, useProductsAvailable} from "../../../store/product/productHooks";
import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";

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
import {useAddFilterProduct, useResetFilters} from "../../../store/filter/filterHooks";
import ProductsView from "../../../components/shop/ProductsView";
import CategorySidebar from "../../../components/shop/CategorySidebar";
import CategorySidebarItem from "../../../components/shop/CategorySidebarItem";
import WidgetFilters from "../../../components/widgets/WidgetFilters";

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
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const openSidebarFn = useCallback(() => setSidebarOpen(true), [setSidebarOpen]);
    const closeSidebarFn = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);
    const addFilter = useAddFilterProduct()
    const offcanvas = 'always';
    const [latestProducts, setLatestProducts] = useState<IProduct[]>([]);

    const productsShop = ()=>(
        <ProductsView
            layout={'grid'}
            grid={`grid-4-full`}
            offcanvas={'always'}
            openSidebarFn={openSidebarFn}
            shortPage={true}
        />
    )
    const sidebarComponent = useMemo(() => (
        <CategorySidebar open={sidebarOpen} closeFn={closeSidebarFn} offcanvas={offcanvas}>
            <CategorySidebarItem>
                <WidgetFilters title="Filtros" offcanvas={offcanvas}  forPage={{
                    type:'brands',
                    slug:brand.slug
                }}/>
            </CategorySidebarItem>
        </CategorySidebar>
    ), [sidebarOpen, closeSidebarFn, offcanvas, latestProducts]);

    useEffect(() => {
        resetFilters()
        addFilter({
            type:'brands',
            slug:brand.slug,
            value:true
        })
        productsRepository.getAllProducts().then(({data}) => (setProductsList(data)))
        brandsRepository.getBrandBySlug(slug).then(({data}) => {
            ids = data[0].products.map(product => product.id);
            setActualBrand(data[0])
        })
        setBrandProducts(allProductsList.filter((product) => (ids.includes(product.id)
        )))
        productsState(brandProducts.filter((product, index)=>index < 12))

    }, [])

    useEffect(()=>{
        productsRepository.getAllProducts().then(({data}) => (setProductsList(data)))
        resetFilters()
        addFilter({
            type:'brands',
            slug:brand.slug,
            value:true
        })
        brandsRepository.getBrandBySlug(slug).then(({data}) => {
            ids = data[0].products.map(product => product.id);
            setActualBrand(data[0])
        })
        setBrandProducts(allProductsList.filter((product) => (ids.includes(product.id)
        )))
        productsState(brandProducts.filter((product, index)=>index < 12))
    }, [brand])



    useEffect(() => {
        setBrandProducts(allProductsList.filter((product) => (ids.includes(product.id)
        )))
    }, [allProductsList])

    useEffect(() => {
        productsState(brandProducts.filter((product, index)=>index < 12))
    }, [brandProducts])

    return (
        <div className={'grid grid-cols-1'}>
            <Head>
                <title>{companyInfo !== undefined ? companyInfo.company_name : null} | {actualBrand? actualBrand.name:brand.name}</title>
            </Head>

                <BlockSlideShow banners={brand?.banners}/>
                <div className={'col-start-1 container'}>
                    <div className={'text-center items-center content-center  mb-10'}>
                        <img className={'mx-auto mb-2'}  src={`${process.env.NEXT_PUBLIC_BASE_URI}${brand.thumbnail_image.url}`}
                             alt=""/>
                        <p className={'px-10'}>{brand.description}</p>
                    </div>
                    <div className={'mb-2'}>
                        <div className={'grid grid-cols-12'}>
                            <div className={'md:col-start-2 col-start-1 md:col-span-10 col-span-11 md:ml-0'}>
                                {productsShop()}
                                {sidebarComponent}
                            </div>
                        </div>
                    </div>


                    <div className={'mt-20 text-center'}>
                        <AppLink className={'btn btn-primary '} href={`/shop/brands/products/${brand.slug}/`}>
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
                        <div className={'md:col-start-1 md:col-span-2 col-start-1'}>
                            <ul className={'pl-2 mb-4'}>
                                {brand.advantages.map(({advantage, id}) => (
                                    <li className={'my-2'} key={id}>- {advantage}</li>))}
                            </ul>
                            <img className={'mx-auto'}
                                 src={`${process.env.NEXT_PUBLIC_BASE_URI}${brand.certificate_images.url}`} alt=""/>
                        </div>
                        <div className={'md:col-start-3 col-start-1'}>
                            <img src={`${process.env.NEXT_PUBLIC_BASE_URI}${brand.advantage_image.url}`} alt=""/>
                        </div>
                    </div>
                </div>
            <ContactForm/>
        </div>
    );
}

export default Page;
