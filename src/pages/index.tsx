// third-party
import {GetServerSideProps} from 'next';

// application
import HomePage, {InitData} from '../components/home/HomePage';
import shopApi from '../api/shop';
import {getCompanyBrands} from "../api/brand";
import {useAddBrandCompany} from "../store/brand/brandHooks";
import {useCompanyAddInfo} from "../store/company/companyHooks";
import {useAddProducts} from "../store/product/productHooks";
import {getProductsApi} from "../api/products";
import {getCompanyInfo} from "../api/companyInfo";

export interface PageProps {
    initData?: InitData;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async () => ({
    props: {
        initData: {
            featuredProducts: await shopApi.getPopularProducts({limit: 8}),
            bestsellers: await shopApi.getPopularProducts({limit: 7}),
            latestProducts: await shopApi.getLatestProducts({limit: 8}),
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
    getCompanyBrands().then(({data}) => (addBrand(data))).catch((err) => console.error(err));
    const companyAddInfo = useCompanyAddInfo();
    const productsAvailables = useAddProducts()
    getProductsApi().then(({data})=>{
        productsAvailables(data)
    }).catch(err=>{
        return console.log(err)
    })
    getCompanyInfo().then(({data}) => {
        companyAddInfo(data[0]);
    }).catch((er) => {
        console.error(er);
    })

    return <HomePage initData={initData}/>;
}

export default Page;
