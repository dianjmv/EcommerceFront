// third-party
import classNames from 'classnames';
// @ts-ignore
import MDReactComponent from 'markdown-react-js';

// application
import AppLink from '../shared/AppLink';
import BlogCommentsList from './BlogCommentsList';

// data stubs
import dataBlogPostComments from '../../data/blogPostComments';
import { IPost } from '../../interfaces/post';
import ProductCard from '../shared/ProductCard';
import PostCard, { PostCardLayout } from '../shared/PostCard';
import React, { useEffect, useState } from 'react';
import PostRepository from '../../api/postRepository';

export type BlogPostLayout = 'classic' | 'full';

export interface BlogPostProps {
    layout?: BlogPostLayout;
    post: IPost;
}

function BlogPost(props: BlogPostProps) {
    const { layout = 'classic', post } = props;
    const [tags, setTags] = useState<string[]>([]);
    const [releatedPosts, setReleatedPost] = useState<IPost[]>([]);
    const postRepository = new PostRepository();
    useEffect(() => {
        const tagsTemp = [];
        for (let tag of post.blog_tags) {
            tagsTemp.push(tag.slug);
        }
        setTags(tagsTemp);
    }, []);
    useEffect(() => {
        postRepository.getPostsByTags(tags).then(({ data }) => setReleatedPost(data));
    }, [tags]);

    const postClasses = classNames('post__content typography px-4 md:px-0', {
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

    const listProducts = () => <p>Products</p>;

    return (
        <div className={`block post post--layout--${layout}`}>
            <div className={`post__header post-header post-header--layout--${layout} text-center`}>
                <h1 className="post-header__title text-4xl ">{post.title}</h1>
            </div>

            <div className={postClasses}>
                <img src={`${process.env.NEXT_PUBLIC_BASE_URI}${post.presentation.url}`} alt="" />
                <MDReactComponent text={post.content} />
            </div>

            <div className="post__footer">
                <div className="post__tags-share-links">
                    <div className="post__share-links share-links">
                        <ul className="share-links__list">
                            <li className="share-links__item share-links__item--type--like">
                                <AppLink href="/">Like</AppLink>
                            </li>
                            <li className="share-links__item share-links__item--type--tweet">
                                <AppLink href="/">Tweet</AppLink>
                            </li>
                            <li className="share-links__item share-links__item--type--pin">
                                <AppLink href="/">Pin It</AppLink>
                            </li>
                            <li className="share-links__item share-links__item--type--counter">
                                <AppLink href="/">4K</AppLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={'grid grid-cols-1'}>
                {post.products.length > 0 ? (
                    <div className={'md:flex grid grid-cols-1'}>
                        {post.products.map(product => (
                            <div className={'mr-10'}>
                                <ProductCard product={product} layout={'grid-lg'} />
                            </div>
                        ))}
                    </div>
                ) : null}
                {post.products.length > 0 ? (
                    <div className={'text-center my-10'}>
                        <AppLink className={'btn btn-primary'} href={'/shop/'}>
                            Ver todos los productos
                        </AppLink>
                    </div>
                ) : null}
            </div>
            <div className={'grid grid-cols-1'}>
                {releatedPosts.length > 0 ? (
                    <>
                        <h3 className={'text-4xl border-gray-300 border-b-4'}>Post Relacionados</h3>
                        <div className={'md:grid md:grid-cols-4 grid-cols-1'}>
                            {releatedPosts.map((postReleated, index) => {
                                const layoutMap: { [layout: string]: PostCardLayout } = {
                                    classic: 'grid-lg',
                                    grid: 'grid-nl',
                                    list: 'list-nl',
                                };
                                if (post.id !== postReleated.id && index < 5) {
                                    return (
                                        <div key={postReleated.id} className="posts-list__item">
                                            <PostCard post={postReleated} layout={layoutMap[layout]} />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default BlogPost;
