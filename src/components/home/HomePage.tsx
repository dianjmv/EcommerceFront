// react
import React, {Fragment, useEffect, useMemo, useState} from 'react';

// third-party
import Head from 'next/head';

// application

import {IProduct} from '../../interfaces/product';
import {ICompanyInfo} from '../../interfaces/company-info';
import {useCompanyInformation, useDeferredData, useProductColumns, useProductTabs} from '../../services/hooks';

// blocks

import BlockProductColumns, {BlockProductColumnsItem} from '../blocks/BlockProductColumns';
import BlockProducts from '../blocks/BlockProducts';

import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs

import {useCompanyAddInfo, useCompanyInfo} from "../../store/company/companyHooks";
import {useAddProducts, useProductsAvailable} from "../../store/product/productHooks";
import ProductsRepository from "../../api/productsRepository";
import {useBrandCompany} from "../../store/brand/brandHooks";
import BaseRepository from "../../api/repository/baseRepository";
import AppLink from "../shared/AppLink";
import SocialNetworks from "../social-networks/SocialNetworks";
import ContactForm from "../contact/ContactForm";
import {ImageBanner} from "../../interfaces/imageBanner";
import BlockSlideHome from '../blocks/BlockSlideHome';

export interface InitData {
    featuredProducts?: IProduct[];
    bestsellers?: IProduct[];
    latestProducts?: IProduct[];
    productColumns?: BlockProductColumnsItem[];
}

export interface HomePageOneProps {
    initData?: InitData;
}

function HomePage(props: InitData) {
    const {featuredProducts} = props;
    const [company, setCompany] = useState<ICompanyInfo>() ;
    const companyInfo = useCompanyInfo();
    const addProductsState = useAddProducts();
    const productsAvailables = useProductsAvailable()
    const brandsCompany = useBrandCompany();
    const [products, setProducts] = useState<IProduct[] | []>([]);
    const productsRepository= new ProductsRepository()


    useEffect(() => {
        productsRepository.getAllProducts().then(({data})=>(addProductsState(data)))
        setProducts(productsAvailables.products)
    }, [])

    useEffect(() => {
        setCompany(companyInfo)

    }, [companyInfo])




    const baseUrl = new BaseRepository();


    /**
     * Featured products.
     */


    /**
     * Bestsellers.
     */



    /**
     * Latest products.
     */




    // @ts-ignore
    return (
        <div>
            <Head>
                <title>{companyInfo !== undefined ? companyInfo.company_name : null}</title>
            </Head>
            <div className={'w-full'}>
                <BlockSlideHome banners={companyInfo.banners}/>
            </div>




            {productsAvailables.products !== []? useMemo(() => (
                <BlockProducts
                    title="Productos Destacados"
                    layout="large-first"
                    // @ts-ignore
                    products={featuredProducts.filter((product, index) => {
                        return (index < 8)
                    })}

                />
            ) , [productsAvailables.products]) :null}
            <div className={'text-center mt-10'}>
                <h2 className={'block-header__title font-bold'}>Nuestras marcas</h2>
                <div className={'mt-12 md:flex grid grid-cols-1 md:justify-center'}>
                    {
                        brandsCompany.brands.length > 0 ? brandsCompany.brands.map((brand) => {
                            return (
                                <AppLink href={`/shop/brands/${brand.slug}`} key={brand.code} className={'md:pl-0 pl-32'}>
                                    <img src={`${baseUrl.getBaseUrl()}${brand.thumbnail_image.url}`} alt=""/>
                                </AppLink>
                            )
                        }) : null
                    }
                </div>
            </div>
            <SocialNetworks/>
            <ContactForm/>
        </div>
    );
}

export default HomePage;
