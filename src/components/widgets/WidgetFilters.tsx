// react
import {ChangeEvent, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';

// third-party
import classNames from 'classnames';

// application
import ArrowRoundedDown12x7Svg from '../../svg/arrow-rounded-down-12x7.svg';
import Collapse, {CollapseRenderFn} from '../shared/Collapse';
import Filter, {FilterChangeValueEvent} from '../filters/Filter';
import {serializeFilterValue, isDefaultFilterValue} from '../../services/filters';
import {
    useShopFilterValues,
    useShopSetFilterValueThunk,
} from '../../store/shop/shopHooks';
import {ICategory} from "../../interfaces/category";
import {IBrand} from "../../interfaces/brand";
import {ISegment} from "../../interfaces/segment";
import CategoryRepository from "../../api/categoryRepository";
import {IFilterableList} from "../../interfaces/list";
import {IFilter, IFilterProduct, PriceType} from "../../interfaces/filter";
import BrandsRepository from "../../api/brandsRepository";
import SegmentRepository from "../../api/segmentRepository";
import {useAddFilterProduct, useFilterProduct, useResetFilters} from "../../store/filter/filterHooks";
import InputRange from "react-input-range";
import CurrencyFormat from "../shared/CurrencyFormat";
import ProductsRepository from "../../api/productsRepository";
import {useAddProducts, useProductsAvailable} from "../../store/product/productHooks";
import {IProduct} from "../../interfaces/product";
import {filter} from "domutils";
import {useRouter} from "next/router";

export interface IForPage {
    type: string
    slug: string
}

type WidgetFiltersProps = {
    title?: ReactNode;
    offcanvas?: 'always' | 'mobile';
    forPage?: IForPage | null
};


interface IFilterWidget {
    type: string;
    element: any[];
    name: string;

}


type RenderFilterFn = CollapseRenderFn<HTMLDivElement, HTMLDivElement>;

function WidgetFilters(props: WidgetFiltersProps) {
    const {title, offcanvas = 'mobile'} = props;
    const values = useShopFilterValues();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [segments, setSegments] = useState<ISegment[]>([]);
    const [filters, setFilters] = useState<IFilterWidget[]>([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(999);
    const productsRepository = new ProductsRepository();

    const addProducts = useAddProducts();

    const filtersState = useFilterProduct();
    const addFilterState = useAddFilterProduct();
    const categoryRepository = new CategoryRepository();
    const brandsRepository = new BrandsRepository();
    const segmentsRepository = new SegmentRepository();
    const filtersAdded = useFilterProduct();
    const [activeCheckedFilter, setActiveCheckedFilter] = useState<IFilterProduct[]>([]);
    const productsState = useProductsAvailable();
    const router = useRouter()
    const [shopBase, setShopBase] = useState<string|null>(null)
    const [typeUrl, setTypeUrl] = useState<string|null> (null)


    const shopSetFilterValue = useShopSetFilterValueThunk();
    const shopResetFilters = useResetFilters();

    const filtersActivated = useFilterProduct()


    useEffect(() => {
        const routeSplited =router.route.split('/')
        setShopBase(routeSplited[1])
        setTypeUrl(routeSplited[2])
        categoryRepository.getAllCategories().then(({data}) => setCategories(data))
        brandsRepository.getAllBrands().then(({data}) => setBrands(data))
        segmentsRepository.getAllSegments().then(({data}) => setSegments(data))
        addFilterState({
            type: 'price',
            slug: 'price',
            value: {min: minValue, max: maxValue}
        })
    }, [])
    useMemo(() => {
        const elementToFilter = []
        elementToFilter.push({
            type: 'categories',
            element: categories,
            name: 'Categorias'
        })
        elementToFilter.push({
            type: 'brands',
            element: brands,
            name: 'Marcas'
        })
        elementToFilter.push({
            type: 'segments',
            element: segments,
            name: 'Segmentos'
        })
        elementToFilter.push({
            type: 'price',
            element: [],
            name: 'Precio'
        })
        setFilters(elementToFilter)
    }, [categories, segments, brands])


    useEffect(() => {
        let haveFilters = false
        for (const filter of filtersActivated.filters) {
            if (filter.type === 'categories' || filter.type === 'brands' || filter.type === 'segments') {
                haveFilters = true;
            }
        }
        if (haveFilters) {
            filterProducts(productsState.products)
        } else {
            productsRepository.getAllProducts().then(({data}) => (filterProducts(data)))
        }

    }, [
        filtersActivated.filters,
        // @ts-ignore
        filtersAdded.filters.filter(filter => filter.type === 'price')[0].value.min,
        // @ts-ignore
        filtersAdded.filters.filter(filter => filter.type === 'price')[0].value.max
    ])
    const activeFilter = async (type: string, slug: string, event: ChangeEvent) => {
        if (type !== 'price') {
            await addFilterState({
                type,
                slug,
                // @ts-ignore
                value: event.target.checked
            })
        }
    }


    function handleChangePrice(event: any) {
        setMinValue(event.min)
        setMaxValue(event.max)
    }

    function handleChangePriceComplete() {
        addFilterState({
            type: 'price',
            slug: 'price',
            value: {min: minValue, max: maxValue}
        })
    }


    function filterProducts(products: IProduct[]) {
        if (filtersActivated.filters.length > 0) {
            productsRepository.getProductsFiltered(filtersActivated.filters).then(({data}) => addProducts(data))
        }
    }


    const priceFilter = (
        <div className="filter-price">
            <div className="filter-price__slider" dir="ltr">
                <InputRange
                    minValue={0}
                    maxValue={999}
                    value={{
                        min: filtersAdded.filters.filter(filter => filter.type === 'price').length > 0 ?
                            // @ts-ignore
                            filtersAdded.filters.filter(filter => filter.type === 'price')[0].value.min :
                            minValue,
                        max: filtersAdded.filters.filter(filter => filter.type === 'price').length > 0 ?
                            // @ts-ignore
                            filtersAdded.filters.filter(filter => filter.type === 'price')[0].value.max :
                            maxValue
                    }}
                    step={1}
                    onChange={handleChangePrice}
                    onChangeComplete={handleChangePriceComplete}
                />
            </div>
            <div className="filter-price__title">
                Precio:
                {' '}
                <span className="filter-price__min-value"><CurrencyFormat value={minValue}/></span>
                {' – '}
                <span className="filter-price__max-value"><CurrencyFormat value={maxValue}/></span>
            </div>
        </div>
    )


    const filtersList = filters.map((filter) => {
        const renderFilter: RenderFilterFn = ({toggle, setItemRef, setContentRef}) => (
            <div className="filter filter--opened" ref={setItemRef}>
                <button type="button" className="filter__title" onClick={toggle}>
                    Filtrar por {filter.name}
                    <ArrowRoundedDown12x7Svg className="filter__arrow"/>
                </button>
                <div className="filter__body" ref={setContentRef}>
                    <div className="filter__container">
                        {
                            filter.type === 'price' ? priceFilter :
                                filter.element.map((elemt) => (
                                    <label
                                        key={elemt.slug}
                                        className={'filter-list__item'}
                                    >
                                        <span className="filter-list__input input-radio">
                                            <span className="input-radio__body">
                                                <input
                                                    className="input-radio__input"
                                                    type="checkbox"
                                                    checked={filtersAdded.filters.filter(productFilter => productFilter.type === filter.type && productFilter.slug === elemt.slug).length > 0}
                                                    name={elemt.slug}
                                                    disabled={ shopBase==='shop' && typeUrl!== undefined && typeUrl === filter.type }
                                                    onChange={(e) => activeFilter(filter.type, elemt.slug, e)}
                                                />
                                                <span className="input-radio__circle"/>
                                            </span>
                                        </span>
                                        <span className="filter-list__title">{elemt.name}</span>
                                    </label>
                                ))
                        }
                        {/*<Filter data={filter} value={values[filter.slug]} onChangeValue={handleValueChange} />*/}
                    </div>
                </div>
            </div>
        );

        return (
            <div key={filter.name.toLowerCase().trim()} className="widget-filters__item">
                <Collapse toggleClass="filter--opened" render={renderFilter}/>
            </div>
        );
    });

    const classes = classNames('widget-filters widget', {
        'widget-filters--offcanvas--always border-none': offcanvas === 'always',
        'widget-filters--offcanvas--mobile border-none': offcanvas === 'mobile',
    });

    return (
        <div className={classes}>


            <div className="widget-filters__list ">
                {filtersList}
            </div>

            <div className="widget-filters__actions d-flex mb-n2">

            </div>
        </div>
    );
}

export default WidgetFilters;
