// third-party
import classNames from 'classnames';

// @ts-ignore
import LinesEllipsis from 'react-lines-ellipsis'

// application
import AppLink from './AppLink';
import url from '../../services/url';
import { IPost } from '../../interfaces/post';
import { format } from 'date-fns';

export type PostCardLayout = 'grid-nl' | 'grid-lg' | 'list-nl' | 'list-sm';

export interface PostCardProps {
    post: IPost;
    layout?: PostCardLayout;
}

function PostCard(props: PostCardProps) {
    const { post, layout } = props;
    const cardClasses = classNames(
        'post-card',
        {
            'post-card--layout--grid': layout && ['grid-nl', 'grid-lg'].includes(layout),
            'post-card--layout--list': layout && ['list-nl', 'list-sm'].includes(layout),
            'post-card--size--nl': layout && ['grid-nl', 'list-nl'].includes(layout),
            'post-card--size--lg': layout === 'grid-lg',
            'post-card--size--sm': layout === 'list-sm',
        },
    );
    const date = new Date(post.created_at)




    return (
        <div className={cardClasses}>
            <div className="post-card__image">
                <AppLink href={`/blog/post/${post.slug}`}>
                    <img src={`${process.env.NEXT_PUBLIC_BASE_URI}${post.thumbnails.url}`} alt="" />
                </AppLink>
            </div>
            <div className="post-card__info">
                <div className="post-card__name">
                    <AppLink href={`/blog/post/${post.slug}`}>
                        {post.title}
                    </AppLink>
                </div>
                <div className="post-card__date">{format(date, 'MMMM-dd-yyyy').toString()}</div>
                <div className="post-card__content">
                    <LinesEllipsis
                        text={post.description}
                        maxLine='2'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                    />
                </div>
                <div className="post-card__read-more">
                    <AppLink href={`/blog/post/${post.slug}`} className="btn btn-secondary btn-sm">
                        Leer Más
                    </AppLink>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
