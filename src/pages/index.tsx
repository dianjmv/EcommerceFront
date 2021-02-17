// third-party
import {GetServerSideProps} from 'next';

// application
import HomePage, {InitData} from '../components/home/HomePage';
import shopApi from '../api/shop';

import {useAddBrandCompany} from "../store/brand/brandHooks";
import {useCompanyAddInfo} from "../store/company/companyHooks";
import {useAddProducts} from "../store/product/productHooks";
import ProductsRepository from "../api/productsRepository";
import CompanyRepository from "../api/companyInfo";
import BrandsRepository from "../api/brandsRepository";
import {useEffect} from "react";

export interface PageProps {
    initData?: InitData;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async () => (

    {
        props: {
            initData: {
                featuredProducts: await shopApi.getPopularProducts({limit: 8}),
                bestsellers: await shopApi.getPopularProducts({limit: 7}),
                latestProducts: await shopApi.getLatestProducts({limit: 8}),
                companyInformation: null,
                productColumns: [
                    {
                        title: 'Top Rated Products',
                        products: await shopApi.getTopRatedProducts({limit: 3}),
                    },
                    {
                        title: 'Special Offers',
                        products: await shopApi.getDiscountedProducts({limit: 3}),
                    },
                    {
                        title: 'Bestsellers',
                        products: await shopApi.getPopularProducts({limit: 3}),
                    },
                ],
            },
        },
    });

function Page(props: PageProps) {
    const {initData} = props;
    const addBrand = useAddBrandCompany();
    const brandsRepository = new BrandsRepository();
    const productsRepository = new ProductsRepository();
    const companyAddInfo = useCompanyAddInfo();
    const productsAvailables = useAddProducts()
    const companyRepository = new CompanyRepository()

    useEffect(() => {
        productsRepository.getAllProducts().then(({data}) => {
            productsAvailables(data)
        }).catch(err => {
            return console.log(err)
        })
        brandsRepository.getCompanyBrands().then(({data}) => (addBrand(data))).catch((err) => console.error(err));
    }, [])
    useEffect(()=>{
        companyRepository.getCompanyInfo().then(({data}) => {
            companyAddInfo(data[0]);
            if (initData) {
                // @ts-ignore
                initData.companyInformation = data[0]
            }

        }).catch((er) => {
            console.error(er);
        })
    }, [])



    return <HomePage initData={initData}/>;
}

export default Page;
