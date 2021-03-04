// widgets
import WidgetAboutus from '../widgets/WidgetAboutus';
import WidgetCategories from '../widgets/WidgetCategories';
import WidgetComments from '../widgets/WidgetComments';
import WidgetNewsletter from '../widgets/WidgetNewsletter';

import WidgetSearch from '../widgets/WidgetSearch';
import WidgetTags from '../widgets/WidgetTags';

// data stubs




export type BlogSidebarPosition = 'start' | 'end';

export interface BlogSidebarProps {
    position?: BlogSidebarPosition;
}

function BlogSidebar(props: BlogSidebarProps) {
    const { position = 'start' } = props;

    return (
        <div className={`block block-sidebar block-sidebar--position--${position}`}>
            <div className="block-sidebar__item">
                <WidgetSearch />
            </div>
            <div className="block-sidebar__item">
                <WidgetAboutus />
            </div>
            <div className="block-sidebar__item">

            </div>
            <div className="block-sidebar__item">

            </div>
            <div className="block-sidebar__item">
                <WidgetNewsletter />
            </div>
            <div className="block-sidebar__item">

            </div>
            <div className="block-sidebar__item">
                <WidgetTags />
            </div>
        </div>
    );
}

export default BlogSidebar;
