// third-party
import { GetServerSideProps } from 'next';

// application
import HomePage, { InitData } from '../components/home/HomePage';

import { useAddBrandCompany } from '../store/brand/brandHooks';
import { useCompanyAddInfo } from '../store/company/companyHooks';
import { useAddProducts, useProductsAvailable } from '../store/product/productHooks';
import ProductsRepository from '../api/productsRepository';
import CompanyRepository from '../api/companyInfo';
import BrandsRepository from '../api/brandsRepository';
import React, { useEffect, useState } from 'react';
import { IProduct } from '../interfaces/product';
import { useFilterProduct, useResetFilters } from '../store/filter/filterHooks';
import { useStartLoading, useStopLoading } from '../store/loading/loadingHooks';
import { data } from 'autoprefixer';

export interface PageProps {
    initData?: InitData;
}

function Page(props: PageProps) {
    const { initData } = props;
    const addBrand = useAddBrandCompany();
    const brandsRepository = new BrandsRepository();
    const productsRepository = new ProductsRepository();
    const companyAddInfo = useCompanyAddInfo();
    const addProductsState = useAddProducts();
    const companyRepository = new CompanyRepository();
    const [products, setProducts] = useState<IProduct[] | []>([]);
    const productsAvailables = useProductsAvailable();
    const resetFilters = useResetFilters();
    const startLoading = useStartLoading();
    const stopLoading = useStopLoading();
    const useFilters = useFilterProduct();
    const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        resetFilters();
        companyRepository
            .getCompanyInfo()
            .then(({ data }) => {
                companyAddInfo(data[0]);
                if (initData) {
                    // @ts-ignore
                    initData.companyInformation = data[0];
                }
            })
            .catch(er => {
                console.error(er);
            });
        brandsRepository
            .getCompanyBrands()
            .then(({ data }) => addBrand(data))
            .catch(err => console.error(err));
        productsRepository
            .getAllProducts()
            .then(({ data }) => addProductsState(data))
            .catch(err => console.error(err));
        setProducts(productsAvailables.products);
    }, []);

    return <HomePage />;
}

export default Page;
