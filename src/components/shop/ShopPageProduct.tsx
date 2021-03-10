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
import { ICategory, IShopCategory } from '../../interfaces/category';

// blocks
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';

// widgets
import WidgetCategories from '../widgets/WidgetCategories';
import WidgetProducts from '../widgets/WidgetProducts';

// data stubs
import theme from '../../data/theme';

import WidgetSearchCategory from '../widgets/WidgetSearchCategory';
import WidgetSearchBrand from '../widgets/WidgetSearchBrand';
import { IBrand } from '../../interfaces/brand';

import WidgetSearchSegment from '../widgets/WidgetSearchSegment';
import { ISegment } from '../../interfaces/segment';

import { useCompanyInfo } from '../../store/company/companyHooks';
import ContactForm from '../contact/ContactForm';
import CategoryRepository from '../../api/categoryRepository';
import BrandsRepository from '../../api/brandsRepository';
import SegmentRepository from '../../api/segmentRepository';
import ProductsRepository from '../../api/productsRepository';

export type ShopPageProductLayout = 'standard' | 'sidebar' | 'columnar';

export type ShopPageProductSidebarPosition = 'start' | 'end';

export interface ShopPageProductProps {
    layout?: ShopPageProductLayout;
    sidebarPosition?: ShopPageProductSidebarPosition;
    // data
    product: IProduct;
}

function ShopPageProduct(props: ShopPageProductProps) {
    const { product, layout = 'standard', sidebarPosition = 'start' } = props;
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [latestProducts, setLatestProducts] = useState<IProduct[]>([]);
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [segments, setSegments] = useState<ISegment[]>([]);
    const compnayInfo = useCompanyInfo();
    const categoriesRepository = new CategoryRepository();
    const brandsRepository = new BrandsRepository();
    const segmentsRepository = new SegmentRepository();
    const productsRepository = new ProductsRepository();

    // Load related products.
    useEffect(() => {
        let canceled = false;
        productsRepository.getProductsMostSeller().then(({ data }) => {
            const products: IProduct[] = [];
            for (let sell of data) {
                let exist = false;
                for (let infoSell of sell.products) {
                    for (let productFiltered of products) {
                        if (productFiltered.id === infoSell.product.id ) {
                            exist = true;
                            break;
                        }
                    }
                    if (!exist) {
                        products.push(infoSell.product);
                    }
                }
            }
            setRelatedProducts(products);
        });
        return () => {
            canceled = true;
        };
    }, [product.slug]);

    // Load categories.
    useEffect(() => {
        let canceled = false;

        if (layout !== 'sidebar') {
            setCategories([]);
        } else {
            segmentsRepository.getAllSegments().then(({ data }) => {
                setSegments(data);
            });

            brandsRepository.getAllBrands().then(({ data }) => {
                setBrands(data);
            });

            categoriesRepository.getAllCategories().then(({ data }) => {
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
            return;
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
                                title="Productos Relacionados"
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
                        <ContactForm />
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <BlockProductsCarousel title="Productos Relacionados" layout="grid-5" products={relatedProducts} />
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
            <ContactForm />
        </Fragment>
    );
}

export default ShopPageProduct;
