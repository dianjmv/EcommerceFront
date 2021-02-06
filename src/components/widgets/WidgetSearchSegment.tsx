// application
import AppLink from '../shared/AppLink';
import ArrowRoundedRight6x9Svg from '../../svg/arrow-rounded-right-6x9.svg';
import Collapse, { CollapseRenderFn } from '../shared/Collapse';
import url from '../../services/url';
import { ICategory } from '../../interfaces/category';
import {ISegment} from "../../interfaces/segment";

type RenderCategoryFn = CollapseRenderFn<HTMLLIElement, HTMLDivElement>;

export type WidgetCategoriesLocation = 'blog' | 'shop';

export interface WidgetCategoriesProps {
    segments?: ISegment[];
    location?: WidgetCategoriesLocation;
}

function WidgetSearchSegment(props: WidgetCategoriesProps) {
    const { segments = [], location = 'blog' } = props;
    const segmentsList = segments.map((segment) => {
        const renderCategory: RenderCategoryFn = ({ toggle, setItemRef, setContentRef }) => {
            let expander;
            let childrenItems;
            return (
                <li className="widget-categories__item" ref={setItemRef}>
                    <div className="widget-categories__row flex">
                        <AppLink href={`/shop/segments/${segment.slug}`} >
                            <ArrowRoundedRight6x9Svg className="widget-categories__arrow" />
                            <div className={'flex items-center'}>
                                {segment.name}
                            </div>
                        </AppLink>
                        {expander}
                    </div>
                    {childrenItems}
                </li>
            );
        };
        return <Collapse key={segment.id} toggleClass="widget-categories__item--open" render={renderCategory} />;
    });

    return (
        <div className={`widget-categories widget-categories--location--${location} widget border-none`}>
            <h4 className="widget__title font-bold">Segmentos</h4>
            <hr/>
            <ul className="widget-categories__list">
                {segmentsList}
            </ul>
        </div>
    );
}

export default WidgetSearchSegment;
