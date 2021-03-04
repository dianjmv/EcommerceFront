import {IProduct} from "../../../interfaces/product";
import {GetServerSideProps} from "next";
import ProductsRepository from "../../../api/productsRepository";
import SitePageNotFound from "../../../components/site/SitePageNotFound";

import {useAddProducts} from "../../../store/product/productHooks";
import {useEffect, useState} from "react";
import ShopPageCategory from "../../../components/shop/ShopPageCategory";

import CategoryRepository from "../../../api/categoryRepository";
import {useAddFilterProduct, useResetFilters} from "../../../store/filter/filterHooks";
import {ICategory} from "../../../interfaces/category";
import ShopPageCategories from "../../../components/shop/ShopPageCategories";


export interface PageProps {
    products: IProduct[] | null;
    category: ICategory | null
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    let products: IProduct[] | null = null;
    let category: ICategory | null = null;
    const categoriesRepository = new CategoryRepository()

    if (typeof context.params?.slug === 'string') {
        const {slug} = context.params;
        await categoriesRepository.getCategoriesBySlug(slug).then(({data}) => {products = data[0].products; category=data[0]}).catch(err => (console.error(err.message)));
    }
    console.log('category', category)
    return {
        props: {
            products,
            category
        },
    };
};

function Page({products, category}: PageProps) {
    if (products === null || category === null) {
        return <SitePageNotFound/>;
    }
    const productsState = useAddProducts();
    const [allProductsList, setProductsList] = useState<IProduct[]>([])
    const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([])
    const ids: number[] = products.map(product => product.id)
    const productsRepository = new ProductsRepository()
    const resetFilters = useResetFilters()
    const addFilter = useAddFilterProduct()
    useEffect(() => {
        productsRepository.getAllProducts().then(({data}) => (setProductsList(data)))
        resetFilters()
        addFilter({
            type:'categories',
            slug:category.slug,
            value:true
        })
    }, [])

    useEffect(() => {
        setCategoryProducts(allProductsList.filter((product) => (ids.includes(product.id)
        )))
    }, [allProductsList])

    useEffect(() => {
        productsState(categoryProducts)
    }, [categoryProducts])


    return <ShopPageCategories columns={4} viewMode="grid" category={category} />;
}

export default Page;
