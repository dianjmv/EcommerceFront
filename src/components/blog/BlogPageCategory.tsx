// react
import React, { useState, Fragment, useEffect, ChangeEvent } from 'react';

// third-party
import Head from 'next/head';

// application
import BlogSidebar from './BlogSidebar';
import PageHeader from '../shared/PageHeader';
import Pagination from '../shared/Pagination';
import PostCard, { PostCardLayout } from '../shared/PostCard';

// data stubs

import theme from '../../data/theme';
import { useCompanyInfo } from '../../store/company/companyHooks';
import ContactForm from '../contact/ContactForm';
import { IPost } from '../../interfaces/post';
import PostRepository from '../../api/postRepository';
import { any } from 'prop-types';

export type BlogPageCategoryLayout = 'classic' | 'grid' | 'list';

export type BlogPageCategorySidebarPosition = 'start' | 'end';

export interface BlogPageCategoryProps {
    layout?: BlogPageCategoryLayout;
    sidebarPosition?: BlogPageCategorySidebarPosition;
}

export interface PostPaginated {
    page: number;
    posts: IPost[];
}

function BlogPageCategory(props: BlogPageCategoryProps) {
    const { layout = 'classic', sidebarPosition = 'start' } = props;
    const [page, setPage] = useState(1);
    const companyInfo = useCompanyInfo();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [postsPaginated, setPostsPAginated] = useState<PostPaginated[]>([]);
    const postRepository = new PostRepository();
    const elementsPerPage = 9;
    useEffect(() => {
        postRepository.getAllPosts().then(({ data }) => {
            paginatePosts(data);
            setPosts(data);
        });
    }, []);

    function paginatePosts(data: IPost[]) {
        let postPaginated = [];
        let pageNumber = 1;
        for (let i = 0; i < data.length; i += elementsPerPage) {
            let page = data.slice(i, i + elementsPerPage);
            const pagePaginated = {
                page: pageNumber,
                posts: page,
            };
            postPaginated.push(pagePaginated);
            pageNumber = pageNumber + 1;
        }
        return setPostsPAginated(postPaginated);
    }

    const breadcrumb = [
        { title: 'Home', url: '/' },
        { title: 'Blog', url: '/' },
        { title: 'Latest News', url: '/' },
    ];

    let sidebarStart;
    let sidebarEnd;

    const sidebar = <BlogSidebar position={sidebarPosition} />;

    if (sidebarPosition === 'start') {
        sidebarStart = <div className="col-12 col-lg-4 order-1 order-lg-0">{sidebar}</div>;
    } else if (sidebarPosition === 'end') {
        sidebarEnd = <div className="col-12 col-lg-4">{sidebar}</div>;
    }

    function searchBlog(searchInput: ChangeEvent): void {
        const filteredPosts = posts.filter(post =>
            // @ts-ignore
            post.title.toLowerCase().includes(searchInput.target.value.toLowerCase())
        );
        paginatePosts(filteredPosts);
    }

    const postsList = postsPaginated.map((paginatedPost, index) => {
        if (paginatedPost.page === page) {
            return paginatedPost.posts.map(post => {
                const layoutMap: { [layout: string]: PostCardLayout } = {
                    classic: 'grid-lg',
                    grid: 'grid-nl',
                    list: 'list-nl',
                };
                return (
                    <div key={post.id} className="posts-list__item">
                        <PostCard post={post} layout={layoutMap[layout]} />
                    </div>
                );
            });
        }
    });

    return (
        <Fragment>
            <Head>
                <title>{`Blog — ${companyInfo.company_name}`}</title>
            </Head>
            <div
                className={'w-full text-center '}
                style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URI}${companyInfo.blog_page_banner.url})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <h1 className={'font-bold text-5xl text-white py-20'}>Blog</h1>
            </div>
            <div className="px-4 mt-8">
                <div className={'grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-2'}>
                    <div className={'md:col-start-1 md:col-span-2 md:pt-4'}>
                        <input
                            type="text"
                            onChange={searchBlog}
                            className={'w-full form-control'}
                            placeholder={'Buscar'}
                        />
                    </div>
                    <div className={'md:col-start-3 md:col-span-10'}>
                        <div className="col-12 col-lg-12">
                            <div className={'col-lg-12'}>
                                <h3 className={'text-4xl border-gray-300 border-b-4'}>Posts Recientes</h3>
                            </div>
                            <div className="block">
                                <div className="posts-view">
                                    <div className={``}>
                                        <div className="grid md:grid-cols-3 grid-cols-1">{postsList}</div>
                                    </div>
                                    <div className="posts-view__pagination">
                                        <Pagination
                                            current={page}
                                            siblings={2}
                                            total={postsPaginated.length}
                                            onPageChange={setPage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ContactForm />
        </Fragment>
    );
}

export default BlogPageCategory;
