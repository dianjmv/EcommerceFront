// react
import {ReactNode, useState, useRef, useEffect, ChangeEvent} from 'react';

// third-party
import classNames from 'classnames';

// application
import Filters16Svg from '../../svg/filters-16.svg';
import LayoutGrid16x16Svg from '../../svg/layout-grid-16x16.svg';
import LayoutGridWithDetails16x16Svg from '../../svg/layout-grid-with-details-16x16.svg';
import LayoutList16x16Svg from '../../svg/layout-list-16x16.svg';
import Pagination from '../shared/Pagination';
import ProductCard from '../shared/ProductCard';
import {
    useSetOption,
    useShopFilterValues,
    useShopOptions,
    useShopProductsList,
    useShopProductsListIsLoading,
    useShopResetFiltersThunk,
} from '../../store/shop/shopHooks';
import {useAddProducts, useProductsAvailable} from "../../store/product/productHooks";
import {IProduct, ProductsPaginated} from "../../interfaces/product";
import {IPost} from "../../interfaces/post";
import ProductsRepository from "../../api/productsRepository";
import WidgetFilters, {IForPage} from "../widgets/WidgetFilters";
import {useFilterProduct, useResetFilters} from "../../store/filter/filterHooks";
import {PriceType} from "../../interfaces/filter";

export type ProductsViewLayout = 'grid' | 'grid-with-features' | 'list';

export type ProductsViewGrid = 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full';

type ProductsViewOffcanvas = 'always' | 'mobile';

interface ProductsViewProps {
    layout?: ProductsViewLayout;
    grid?: ProductsViewGrid;
    offcanvas?: ProductsViewOffcanvas;
    openSidebarFn?: () => void;
    forpage?:IForPage
    shortPage? : boolean
}

interface ViewMode {
    key: ProductsViewLayout;
    title: string;
    icon: ReactNode;
}




function ProductsView(props: ProductsViewProps) {
    const {
        layout: propsLayout = 'grid',
        grid = 'grid-3-sidebar',
        offcanvas = 'mobile',
        openSidebarFn,
    } = props;
    const [layout, setLayout] = useState(propsLayout);
    const [productsPaginated, setProductsPaginated] = useState<ProductsPaginated[]>([])
    const [page, setPage] = useState(1);
    let elementsPerPage = 12

    const isLoading = useShopProductsListIsLoading();

    const productsList = useShopProductsList();
    const options = useShopOptions();
    const filterValues = useShopFilterValues();
    const productsState = useProductsAvailable();
    const productsRepository = new ProductsRepository()
    const addProducts = useAddProducts();
    const filtersActivated = useFilterProduct()

    const handlePageChange = useSetOption('page', parseFloat);

    function handleSortChange(event: ChangeEvent): void {
        // @ts-ignore
        if (event.target.value === 'name_asc') {
            productsRepository.getProductsOrderByName('ASC').then(({data}) => {
                filterProducts(data)
            })
        }
        // @ts-ignore
        if (event.target.value === 'name_desc') {
            productsRepository.getProductsOrderByName('DESC').then(({data}) => {
                filterProducts(data)
            })
        }
        // @ts-ignore
        if (event.target.value === 'default') {
            productsRepository.getAllProducts().then(({data}) => {
                filterProducts(data)
            })
        }
        // @ts-ignore
        if (event.target.value === 'price_asc') {
            productsRepository.getProductsOrderByPrice('ASC').then(({data}) => {
                filterProducts(data)
            })
        }
        // @ts-ignore
        if (event.target.value === 'price_desc') {
            productsRepository.getProductsOrderByPrice('DESC').then(({data}) => {
                filterProducts(data)
            })
        }
    }

    function filterProducts(products: IProduct[]) {
        let productsFiltered: IProduct[] = products

        // @ts-ignore
        const {min, max}: PriceType = filtersActivated.filters.filter(fillter => fillter.type === 'price')[0].value
        if (filtersActivated.filters.length > 0) {
            for (const filter of filtersActivated.filters) {
                if (filter.type === 'categories' || filter.type === 'brands' || filter.type === 'segments') {
                    productsFiltered = products.filter(produc => {
                            return (
                                (produc.product_categories.filter(category => category.slug === filter.slug).length > 0 ||
                                    produc.brands.filter(brand => brand.slug === filter.slug).length > 0 ||
                                    produc.segments.filter(segment => segment.slug === filter.slug).length > 0)
                                &&
                                (produc.sale_price >= min && produc.sale_price <= max)
                            )
                        }
                    )
                }
            }
            addProducts(productsFiltered)
        }
    }



    function handleLimitChange(event: ChangeEvent): void {
        // @ts-ignore
        elementsPerPage = event.target.value;
        paginateProducts(productsState.products)
    }

    function changeLimitByClick(limit: number): void {
        elementsPerPage = limit;
        paginateProducts(productsState.products)
    }
    const shopResetFilters = useResetFilters();


    if (productsState.products === null) {
        return null;
    }

    useEffect(()=>{
        paginateProducts(productsState.products)
    },[productsState.products])

    function paginateProducts(data: IProduct[]) {
        let productsPaginated = []
        let pageNumber = 1
        for (let i = 0; i < data.length; i += elementsPerPage) {
            let page = data.slice(i, i + elementsPerPage);
            const pagePaginated = {
                page: pageNumber,
                products: page
            }
            productsPaginated.push(pagePaginated);
            pageNumber = pageNumber + 1;
        }
        return (setProductsPaginated(productsPaginated))
    }

    const filtersCount = Object.keys(filterValues).map((x) => filterValues[x]).filter((x) => x).length;
    const viewModesDef: ViewMode[] = [
        {key: 'grid', title: 'Grid', icon: <LayoutGrid16x16Svg/>},
        {key: 'grid-with-features', title: 'Grid With Features', icon: <LayoutGridWithDetails16x16Svg/>},
        {key: 'list', title: 'List', icon: <LayoutList16x16Svg/>},
    ];


    const viewModes = viewModesDef.map((viewMode) => {
        const className = classNames('layout-switcher__button', {
            'layout-switcher__button--active': layout === viewMode.key,
        });

        return (
            <button
                key={viewMode.key}
                title={viewMode.title}
                type="button"
                className={className}
                onClick={() => setLayout(viewMode.key)}
            >
                {viewMode.icon}
            </button>
        );
    });

    const productsListItems = productsPaginated.map((paginated) => {
            if (paginated.page === page) {
                return (
                    paginated.products.map((product) => (
                        <div key={product.id}
                             className={layout === 'grid' || layout === 'grid-with-features' ? " w-full" : "products-list__item"}>
                            <ProductCard product={product}/>
                        </div>))
                )
            }
        })
    ;

    const rootClasses = classNames('products-view', {
        'products-view--loading': false,
    });

    const viewOptionsClasses = classNames('view-options', {
        'view-options--offcanvas--always': offcanvas === 'always',
        'view-options--offcanvas--mobile': offcanvas === 'mobile',
    });

    let content;

    if (productsPaginated.length > 0) {
        content = (
            <div className="products-view__content">
                <div className={'grid grid-cols-12 gap-x-8'}>
                    <div className={'hidden md:grid md:col-start-1 md:col-span-3'}>
                        <WidgetFilters forPage={props.forpage? props.forpage:null}/>
                    </div>
                    <div className={'md:col-start-4 md:col-span-8 col-start-1 col-span-11'}>
                        <div className="products-view__options">
                            <div className={viewOptionsClasses}>
                                <div className="view-options__filters-button">
                                    <button type="button" className="filters-button" onClick={openSidebarFn}>
                                        <Filters16Svg className="filters-button__icon"/>
                                        <span className="filters-button__title">Filtros</span>
                                        {!!filtersCount &&
                                        <span className="filters-button__counter">{filtersCount}</span>}
                                    </button>
                                </div>
                                <div className="view-options__layout md:hidden">
                                    <div className="layout-switcher">
                                        <div className="layout-switcher__list">
                                            {viewModes}
                                        </div>
                                    </div>
                                </div>
                                <div className="view-options__divider"/>
                                <div className={'view-options__control hidden md:flex'}>
                                    <div className="layout-switcher__list">
                                        {viewModes}
                                    </div>
                                </div>
                                <div className="view-options__control">
                                    <label htmlFor="view-options-limit">Mostrar</label>
                                    <div className={''}>
                                        <select
                                            id="view-options-limit"
                                            className="form-control form-control-sm"
                                            value={options.limit}
                                            onChange={handleLimitChange}>
                                            <option value="12">12</option>
                                            <option value="18">18</option>
                                            <option value="24">24</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="view-options__control">
                                    <label htmlFor="view-options-sort">Ordenar Por</label>
                                    <div>
                                        <select
                                            id="view-options-sort"
                                            className="form-control form-control-sm"
                                            value={options.sort}
                                            onChange={handleSortChange}
                                        >
                                            <option value="default">Por Defecto</option>
                                            <option value="name_asc">Nombre (A-Z)</option>
                                            <option value="name_desc">Nombre (Z-A)</option>
                                            <option value="price_desc">Precio (mayor a menor)</option>
                                            <option value="price_asc">Precio (menor a mayor)</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div
                            className="products-view__list products-list"
                            data-layout={layout !== 'list' ? grid : layout}
                            data-with-features={layout === 'grid-with-features' ? 'true' : 'false'}
                        >
                            <div
                                className={layout === 'grid' || layout === 'grid-with-features' ? "products-list__body grid md:grid-cols-4 grid-cols-1 gap-y-3 gap-x-3 " : "products-list__body "}>
                                {productsListItems}
                            </div>
                        </div>
                        {
                            props.shortPage ? null: <div className="products-view__pagination">
                                <Pagination
                                    current={page}
                                    siblings={2}
                                    total={productsPaginated.length}
                                    onPageChange={setPage}
                                />
                            </div>
                        }


                    </div>

                </div>

            </div>
        );
    } else {
        content = (
            <div className="products-view__content">
                <div className={'grid grid-cols-12 gap-x-8'}>
                    <div className={'hidden md:grid md:col-start-1 md:col-span-3'}>
                        <WidgetFilters forPage={props.forpage? props.forpage:null}/>
                    </div>
                    <div className="products-view__empty md:col-start-4 md:col-span-8 col-start-1 col-span-11">
                        <div className="view-options__filters-button">
                            <button type="button" className="filters-button" onClick={openSidebarFn}>
                                <Filters16Svg className="filters-button__icon"/>
                                <span className="filters-button__title">Filtros</span>
                                {!!filtersCount &&
                                <span className="filters-button__counter">{filtersCount}</span>}
                            </button>
                        </div>
                        <div className="products-view__empty-title">No existen elementos</div>
                        <div className="products-view__empty-subtitle text-center">Intenta cambiando tus parámetros de busqueda </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className={rootClasses}>
            <div className="products-view__loader"/>
            {content}
        </div>
    );
}

export default ProductsView;
