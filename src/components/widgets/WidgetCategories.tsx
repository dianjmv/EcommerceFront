// application
import AppLink from '../shared/AppLink';
import ArrowRoundedRight6x9Svg from '../../svg/arrow-rounded-right-6x9.svg';
import Collapse, { CollapseRenderFn } from '../shared/Collapse';
import url from '../../services/url';
import { ICategory } from '../../interfaces/category';

type RenderCategoryFn = CollapseRenderFn<HTMLLIElement, HTMLDivElement>;

export type WidgetCategoriesLocation = 'blog' | 'shop';

export interface WidgetCategoriesProps {
    categories?: ICategory[];
    location?: WidgetCategoriesLocation;
}

function WidgetCategories(props: WidgetCategoriesProps) {
    const { categories = [], location = 'blog' } = props;
    const categoriesList = categories.map(category => {
        const renderCategory: RenderCategoryFn = ({ toggle, setItemRef, setContentRef }) => {
            let expander;
            let childrenItems;
            return (
                <li className="widget-categories__item" ref={setItemRef}>
                    <div className="widget-categories__row">
                        <AppLink href={`/shop/categories/${category.slug}`}>
                            <ArrowRoundedRight6x9Svg className="widget-categories__arrow" />
                            {category.name}
                        </AppLink>
                        {expander}
                    </div>
                    {childrenItems}
                </li>
            );
        };
        return <Collapse key={category.id} toggleClass="widget-categories__item--open" render={renderCategory} />;
    });

    return (
        <div className={`widget-categories widget-categories--location--${location} widget border-none`}>
            <h4 className="widget__title font-bold">Categorías</h4>
            <hr />
            <ul className="widget-categories__list">{categoriesList}</ul>
        </div>
    );
}

export default WidgetCategories;
