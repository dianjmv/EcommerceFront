// third-party
import classNames from 'classnames';
// @ts-ignore
import MDReactComponent from 'markdown-react-js';

// application
import AppLink from '../shared/AppLink';
import BlogCommentsList from './BlogCommentsList';

// data stubs
import dataBlogPostComments from '../../data/blogPostComments';
import dataBlogPosts from '../../data/blogPosts';
import {IPost} from "../../interfaces/post";
import ProductCard from "../shared/ProductCard";
import PostCard, {PostCardLayout} from "../shared/PostCard";
import React from "react";

export type BlogPostLayout = 'classic' | 'full';

export interface BlogPostProps {
    layout?: BlogPostLayout;
    post: IPost
}

function BlogPost(props: BlogPostProps) {
    const {layout = 'classic', post} = props;

    const postClasses = classNames('post__content typography', {
        'typography--expanded': layout === 'full',
    });

    // const relatedPostsList = dataBlogPosts.slice(0, 2).map((relatedPost) => (
    //     <div key={relatedPost.id} className="related-posts__item post-card post-card--layout--related">
    //         <div className="post-card__image">
    //             <AppLink href="/">
    //                 <img src={relatedPost.presentation.url} alt="" />
    //             </AppLink>
    //         </div>
    //         <div className="post-card__info">
    //             <div className="post-card__name">
    //                 <AppLink href="/">{relatedPost.title}</AppLink>
    //             </div>
    //             <div className="post-card__date">{relatedPost.updated_at}</div>
    //         </div>
    //     </div>
    // ));

    const listProducts = () => (<p>Products</p>)

    return (
        <div className={`block post post--layout--${layout}`}>
            <div className={`post__header post-header post-header--layout--${layout}`}>
                <h1 className="post-header__title text-4xl">{post.title}</h1>
            </div>



            <div className={postClasses}>
                <img src={`${process.env.NEXT_PUBLIC_BASE_URI}${post.presentation.url}`} alt=""/>
                <MDReactComponent text={post.content}/>

            </div>

            <div className="post__footer">
                <div className="post__tags-share-links">
                    <div className="post__share-links share-links">
                        <ul className="share-links__list">
                            <li className="share-links__item share-links__item--type--like"><AppLink
                                href="/">Like</AppLink></li>
                            <li className="share-links__item share-links__item--type--tweet"><AppLink
                                href="/">Tweet</AppLink></li>
                            <li className="share-links__item share-links__item--type--pin"><AppLink href="/">Pin
                                It</AppLink></li>
                            <li className="share-links__item share-links__item--type--counter"><AppLink
                                href="/">4K</AppLink></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={'grid grid-cols-1'}>
                {
                    post.products.length > 0 ?
                        <div className={'md:flex grid grid-cols-1'}>
                            {post.products.map(product => (
                                <div className={'mr-10'}>
                                    <ProductCard product={product} layout={'grid-lg'}/>
                                </div>
                            ))}
                        </div>
                        : null
                }
                {
                    post.products.length > 0 ?
                        <div className={'text-center my-10'}>
                            <AppLink className={'btn btn-primary'} href={'/shop/'}>
                                Ver todos los productos
                            </AppLink>
                        </div>
                        : null
                }
            </div>
            <div className={'grid grid-cols-1'}>
                <h3 className={'text-4xl border-gray-300 border-b-4'}>Post Relacionados</h3>
                <div className={'md:grid md:grid-cols-4 grid-cols-1'}>
                    {post.related_posts.map((post) => {
                            const layoutMap: { [layout: string]: PostCardLayout } = {
                                classic: 'grid-lg',
                                grid: 'grid-nl',
                                list: 'list-nl',
                            }
                            return (
                                <div key={post.id} className="posts-list__item">
                                    <PostCard post={post} layout={layoutMap[layout]}/>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>

        </div>
    );
}

export default BlogPost;