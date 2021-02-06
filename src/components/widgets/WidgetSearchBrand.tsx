// application
import AppLink from '../shared/AppLink';
import ArrowRoundedRight6x9Svg from '../../svg/arrow-rounded-right-6x9.svg';
import Collapse, { CollapseRenderFn } from '../shared/Collapse';
import url from '../../services/url';
import { ICategory } from '../../interfaces/category';
import {IBrand} from "../../interfaces/brand";

type RenderCategoryFn = CollapseRenderFn<HTMLLIElement, HTMLDivElement>;

export type WidgetCategoriesLocation = 'blog' | 'shop';

export interface WidgetCategoriesProps {
    brands?: IBrand[];
    location?: WidgetCategoriesLocation;
}

function WidgetSearchBrand(props: WidgetCategoriesProps) {
    const { brands = [], location = 'blog' } = props;
    const brandsList = brands.map((brand) => {
        const renderCategory: RenderCategoryFn = ({ toggle, setItemRef, setContentRef }) => {
            let expander;
            let childrenItems;
            return (
                <li className="widget-categories__item" ref={setItemRef}>
            <div className="widget-categories__row flex">
            <AppLink href={`/shop/brands/${brand.slug}`} >
            <ArrowRoundedRight6x9Svg className="widget-categories__arrow" />
            <div className={'flex items-center'}>
            {brand.name}
            </div>
            </AppLink>
            {expander}
            </div>
            {childrenItems}
            </li>
        );
        };
        return <Collapse key={brand.id} toggleClass="widget-categories__item--open" render={renderCategory} />;
    });

    return (
        <div className={`widget-categories widget-categories--location--${location} widget border-none`}>
    <h4 className="widget__title font-bold">Marcas</h4>
    <hr/>
    <ul className="widget-categories__list">
        {brandsList}
        </ul>
        </div>
);
}

export default WidgetSearchBrand;
