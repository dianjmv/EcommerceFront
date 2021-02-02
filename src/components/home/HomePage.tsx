// react
import React, {Fragment, useEffect, useMemo, useState} from 'react';

// third-party
import Head from 'next/head';

// application
import shopApi from '../../api/shop';
import {IProduct} from '../../interfaces/product';
import {ICompanyInfo} from '../../interfaces/company-info';
import {useCompanyInformation, useDeferredData, useProductColumns, useProductTabs} from '../../services/hooks';

// blocks
import BlockBanner from '../blocks/BlockBanner';
import BlockBrands from '../blocks/BlockBrands';
import BlockCategories from '../blocks/BlockCategories';
import BlockFeatures from '../blocks/BlockFeatures';
import BlockPosts from '../blocks/BlockPosts';
import BlockProductColumns, {BlockProductColumnsItem} from '../blocks/BlockProductColumns';
import BlockProducts from '../blocks/BlockProducts';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs
import dataBlogPosts from '../../data/blogPosts';
import dataShopBlockCategories from '../../data/shopBlockCategories';
import theme from '../../data/theme';
import {getCompanyInfo} from "../../api/companyInfo";
import {useCompanyAddInfo, useCompanyInfo} from "../../store/company/companyHooks";
import {useAddProducts, useProductsAvailable} from "../../store/product/productHooks";
import {getProductsApi} from "../../api/products";
import {useBrandCompany} from "../../store/brand/brandHooks";
import BaseRepository from "../../api/repository/baseRepository";
import AppLink from "../shared/AppLink";
import SocialNetworks from "../social-networks/SocialNetworks";
import ContactForm from "../contact/ContactForm";

export interface InitData {
    featuredProducts?: IProduct[];
    bestsellers?: IProduct[];
    latestProducts?: IProduct[];
    productColumns?: BlockProductColumnsItem[];
}

export interface HomePageOneProps {
    initData?: InitData;
}

function HomePage(props: HomePageOneProps) {
    const {initData} = props;
    const [company, setCompany] = useState<ICompanyInfo>();
    const companyInfo = useCompanyInfo();
    const productsAvailables = useProductsAvailable()
    const brandsCompany = useBrandCompany();
    const [products, setProducts] = useState<IProduct[]|[]> ([]);
    useEffect(()=>{
        setProducts(productsAvailables.products)
    }, [productsAvailables.products])

    useEffect(() => {
        setCompany(companyInfo)
    }, [companyInfo])

    const baseUrl= new BaseRepository();



    /**
     * Featured products.
     */
    const featuredProducts = useProductTabs(
        useMemo(() => [
            {id: 1, name: 'All', categorySlug: undefined},
            {id: 2, name: 'Power Tools', categorySlug: 'power-tools'},
            {id: 3, name: 'Hand Tools', categorySlug: 'hand-tools'},
            {id: 4, name: 'Plumbing', categorySlug: 'plumbing'},
        ], []),
        (tab) => shopApi.getPopularProducts({limit: 8, category: tab.categorySlug}),
        initData?.featuredProducts,
    );

    /**
     * Bestsellers.
     */
    const bestsellers = useDeferredData(() => (
        shopApi.getPopularProducts({limit: 7})
    ), [], initData?.bestsellers);

    /**
     * Latest products.
     */
    const latestProducts = useProductTabs(
        useMemo(() => [
            {id: 1, name: 'All', categorySlug: undefined},
            {id: 2, name: 'Power Tools', categorySlug: 'power-tools'},
            {id: 3, name: 'Hand Tools', categorySlug: 'hand-tools'},
            {id: 4, name: 'Plumbing', categorySlug: 'plumbing'},
        ], []),
        (tab) => shopApi.getLatestProducts({limit: 8, category: tab.categorySlug}),
        initData?.latestProducts,
    );

    /**
     * Product columns.
     */
    const columns = initData?.productColumns || useProductColumns(
        useMemo(() => [
            {
                title: 'Top Rated Products',
                source: () => shopApi.getTopRatedProducts({limit: 3}),
            },
            {
                title: 'Special Offers',
                source: () => shopApi.getDiscountedProducts({limit: 3}),
            },
            {
                title: 'Bestsellers',
                source: () => shopApi.getPopularProducts({limit: 3}),
            },
        ], []),
    );

    return (
        <Fragment>
            <Head>
                <title>{companyInfo !== undefined ? companyInfo.company_name: null}</title>
            </Head>

            {useMemo(() => <BlockSlideShow/>, [])}


            {useMemo(() => (
                <BlockProducts
                    title="Productos Destacados"
                    layout="large-first"
                    products={products.filter(product => product.is_featured)}

                />
            ), [products])}
            <div className={'text-center mt-10'}>
                <h2 className={'block-header__title font-bold'}>Nuestras marcas</h2>
                <div className={'mt-12 md:flex grid grid-cols-1 md:justify-center'}>
                    {
                        brandsCompany.brands.length>0? brandsCompany.brands.map((brand)=>{
                            return(
                                <AppLink href={`brands/${brand.slug}`} key={brand.code} className={'md:pl-0 pl-32'}>
                                    <img  src={`${baseUrl.getBaseUrl()}${brand.thumbnail_image.url}`} alt=""/>
                                </AppLink>
                            )
                        }):null


                    }
                </div>
            </div>
            <SocialNetworks />
            <ContactForm/>

        </Fragment>
    );
}

export default HomePage;
