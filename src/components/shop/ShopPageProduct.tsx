// react
import { Fragment, useEffect, useState } from 'react';

// third-party
import Head from 'next/head';

// application
import PageHeader from '../shared/PageHeader';
import Product from '../shared/Product';
import ProductTabs from './ProductTabs';

import url from '../../services/url';
import { IProduct } from '../../interfaces/product';
import {ICategory, IShopCategory} from '../../interfaces/category';

// blocks
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';

// widgets
import WidgetCategories from '../widgets/WidgetCategories';
import WidgetProducts from '../widgets/WidgetProducts';

// data stubs
import theme from '../../data/theme';
import {getAllCategories} from "../../api/categories";
import WidgetSearchCategory from "../widgets/WidgetSearchCategory";
import WidgetSearchBrand from "../widgets/WidgetSearchBrand";
import {IBrand} from "../../interfaces/brand";
import {getAllBrands} from "../../api/brands";
import WidgetSearchSegment from "../widgets/WidgetSearchSegment";
import {ISegment} from "../../interfaces/segment";
import {getAllSegments} from "../../api/segments";
import {useCompanyInfo} from "../../store/company/companyHooks";
import ContactForm from "../contact/ContactForm";

export type ShopPageProductLayout = 'standard' | 'sidebar' | 'columnar';

export type ShopPageProductSidebarPosition = 'start' | 'end';

export interface ShopPageProductProps {
    layout?: ShopPageProductLayout;
    sidebarPosition?: ShopPageProductSidebarPosition;
    // data
    product: IProduct;
}

function ShopPageProduct(props: ShopPageProductProps) {
    const {
        product,
        layout = 'standard',
        sidebarPosition = 'start',
    } = props;
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [latestProducts, setLatestProducts] = useState<IProduct[]>([]);
    const [brands, setBrands]= useState <IBrand[]> ([]);
    const [segments, setSegments] = useState <ISegment[]>([]);
    const compnayInfo = useCompanyInfo();

    // Load related products.
    useEffect(() => {
        let canceled = false;

        getAllBrands().then(({data})=>{
            setBrands(data)
        })

        getAllCategories().then(({data}) => {
            if (canceled) {
                return;
            }
            setCategories(data)
        });

        return () => {
            canceled = true;
        };
    }, [product.slug, setRelatedProducts]);

    // Load categories.
    useEffect(() => {
        let canceled = false;

        if (layout !== 'sidebar') {
            setCategories([]);
        } else {
            getAllSegments().then(({data})=>{
                setSegments(data)
            })

            getAllBrands().then(({data})=>{
                setBrands(data)
            })

            getAllCategories().then(({data}) => {
                if (canceled) {
                    return;
                }

                setCategories(data);
            });
        }

        return () => {
            canceled = true;
        };
    }, [layout]);

    // Load latest products.
    useEffect(() => {
        let canceled = false;

        if (layout !== 'sidebar') {
            setLatestProducts([]);
        } else {
            return
        }

        return () => {
            canceled = true;
        };
    }, [layout]);

    const breadcrumb = [
        { title: 'Inicio', url: url.home() },
        { title: 'Tienda', url: url.catalog() },
        { title: product.title, url: url.product(product) },
    ];

    let content;

    if (layout === 'sidebar') {
        const sidebar = (
            <div className="shop-layout__sidebar">
                <div className="block block-sidebar">
                    <div className="block-sidebar__item">
                        <WidgetSearchSegment segments={segments} location="shop" />
                    </div>
                    <div className="block-sidebar__item  d-lg-block">
                        <WidgetSearchBrand brands={brands} location="shop" />
                    </div>
                    <div className="block-sidebar__item d-lg-block">
                        <WidgetSearchCategory categories={categories} location="shop" />
                    </div>
                </div>
            </div>
        );

        content = (
            <div className="container">
                <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
                    {sidebarPosition === 'start' && sidebar}
                    <div className=" shop-layout__content">
                        <div className=" block">
                            <Product product={product} layout={layout} />
                            {/*<ProductTabs withSidebar />*/}
                        </div>

                        {relatedProducts.length > 0 && (
                            <BlockProductsCarousel
                                title="Related Products"
                                layout="grid-4-sm"
                                products={relatedProducts}
                                withSidebar
                            />
                        )}
                    </div>
                    {sidebarPosition === 'end' && sidebar}
                </div>

            </div>
        );
    } else {
        content = (
            <Fragment>
                <div className="block">
                    <div className="container">
                        <Product product={product} layout={layout} />
                        <ProductTabs />
                    </div>
                    <div>
                        <ContactForm/>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <BlockProductsCarousel
                        title="Productos Relacionados"
                        layout="grid-5"
                        products={relatedProducts}
                    />
                )}
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{`${compnayInfo.company_name} | ${product.title}`}</title>
            </Head>

            <PageHeader breadcrumb={breadcrumb} />

            {content}
            <ContactForm/>
        </Fragment>
    );
}

export default ShopPageProduct;
