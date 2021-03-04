// react
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

// third-party
import Head from 'next/head';
import queryString from 'query-string';
import { useRouter } from 'next/router';

// application
import BlockLoader from '../blocks/BlockLoader';
import CategorySidebar from './CategorySidebar';
import CategorySidebarItem from './CategorySidebarItem';
import PageHeader from '../shared/PageHeader';
import ProductsView, { ProductsViewGrid } from './ProductsView';

import url from '../../services/url';
import WidgetFilters from '../widgets/WidgetFilters';
import WidgetProducts from '../widgets/WidgetProducts';
import { buildQuery } from '../../store/shop/shopHelpers';

import { IProduct } from '../../interfaces/product';
import { useShop } from '../../store/shop/shopHooks';

// data stubs
import theme from '../../data/theme';
import { useAddProducts, useProductsAvailable } from '../../store/product/productHooks';

import { useCompanyInfo } from '../../store/company/companyHooks';
import { IBrand } from '../../interfaces/brand';
import ContactForm from '../contact/ContactForm';
import ProductsRepository from '../../api/productsRepository';

export type ShopPageCategoryColumns = 3 | 4 | 5;
export type ShopPageCategoryViewMode = 'grid' | 'grid-with-features' | 'list';
export type ShopPageCategorySidebarPosition = 'start' | 'end';

export interface ShopPageCategoryProps {
    columns: ShopPageCategoryColumns;
    viewMode: ShopPageCategoryViewMode;
    sidebarPosition?: ShopPageCategorySidebarPosition;
    brand: IBrand;
}

function ShopPageBrand(props: ShopPageCategoryProps) {
    const { columns, viewMode, sidebarPosition = 'start', brand } = props;
    const offcanvas = columns === 3 ? 'mobile' : 'always';
    const productsViewGrid = `grid-${columns}-${columns > 3 ? 'full' : 'sidebar'}` as ProductsViewGrid;

    // shop
    const shopState = useShop();
    const productsState = useProductsAvailable();
    const addProducts = useAddProducts();
    const companyInfo = useCompanyInfo();
    const productsRepository = new ProductsRepository();

    const router = useRouter();
    const [latestProducts, setLatestProducts] = useState<IProduct[]>([]);

    // sidebar
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const openSidebarFn = useCallback(() => setSidebarOpen(true), [setSidebarOpen]);
    const closeSidebarFn = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);

    // Replace current url.
    useEffect(() => {
        const query = buildQuery(shopState.options, shopState.filters);
        const href = queryString.stringifyUrl(
            {
                ...queryString.parseUrl(router.asPath),
                query: queryString.parse(query),
            },
            { encode: false }
        );

        router
            .replace(router.pathname, href, {
                shallow: true,
            })
            .then(() => {
                // This is necessary for the "History API" to work.
                window.history.replaceState(
                    {
                        ...window.history.state,
                        options: {
                            ...window.history.state.options,
                            shallow: false,
                        },
                    },
                    '',
                    href
                );
            });
    }, [shopState.options, shopState.filters]);

    // Load latest products.
    useEffect(() => {
        let canceled = false;

        if (offcanvas === 'always') {
            if (productsState.products.length > 0) {
                setLatestProducts(productsState.products);
            } else {
                productsRepository.getAllProducts().then(({ data }) => {
                    addProducts(data);
                    setLatestProducts(data);
                });
            }
        } else {
            if (productsState.products.length > 0) {
                setLatestProducts(productsState.products);
            } else {
                productsRepository.getAllProducts().then(({ data }) => {
                    addProducts(data);
                    setLatestProducts(data);
                });
            }
        }

        return () => {
            canceled = true;
        };
    }, [offcanvas]);

    const sidebarComponent = useMemo(
        () => (
            <CategorySidebar open={sidebarOpen} closeFn={closeSidebarFn} offcanvas={offcanvas}>
                <CategorySidebarItem>
                    <WidgetFilters
                        title="Filtros"
                        offcanvas={offcanvas}
                        forPage={{
                            type: 'brands',
                            slug: brand.slug,
                        }}
                    />
                </CategorySidebarItem>
            </CategorySidebar>
        ),
        [sidebarOpen, closeSidebarFn, offcanvas, latestProducts]
    );

    // if (shopState.categoryIsLoading || (shopState.productsListIsLoading && !shopState.productsList)) {
    //     return <BlockLoader />;
    // }

    const breadcrumb = [
        { title: 'Inicio', url: url.home() },
        { title: 'Tienda', url: '/shop/' },
        { title: 'Marcas', url: `/shop/brands/${brand.slug}` },
        { title: brand.name, url: '' },
    ];
    let pageTitle = '';
    let content;

    // if (shopState.category) {
    //     getCategoryParents(shopState.category).forEach((parent) => {
    //         breadcrumb.push({ title: parent.name, url: url.category(parent) });
    //     });
    //     breadcrumb.push({ title: shopState.category.name, url: url.category(shopState.category) });
    //     pageTitle = shopState.category.name;
    // }

    const productsView = (
        <ProductsView layout={viewMode} grid={productsViewGrid} offcanvas={offcanvas} openSidebarFn={openSidebarFn} />
    );

    if (columns > 3) {
        content = (
            <div className="container">
                <div className="block">{productsView}</div>
                {sidebarComponent}
            </div>
        );
    } else {
        const sidebar = <div className="shop-layout__sidebar"></div>;

        content = (
            <div className="container">
                <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
                    <div className="shop-layout__sidebar">{sidebarComponent}</div>
                    <div className="shop-layout__content">
                        <div className="block">{productsView}</div>
                    </div>
                    {sidebarPosition === 'end' && sidebar}
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{companyInfo !== undefined ? companyInfo.company_name : null} | Tienda</title>
            </Head>
            <div
                className={'bg-gray-200 text-center text-white font-bold text-5xl py-20 '}
                style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URI}${brand.banner_image.url})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <h1 className={'text-5xl font-bold text-white '}>{brand.name}</h1>
            </div>
            <PageHeader header={pageTitle} breadcrumb={breadcrumb} />
            {content}
            <ContactForm />
        </Fragment>
    );
}

export default ShopPageBrand;
