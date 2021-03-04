// react
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';

// third-party
import Head from 'next/head';

// application
import BlogPost from './BlogPost';
import BlogSidebar from './BlogSidebar';
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';
import { IPost } from '../../interfaces/post';
import SitePageNotFound from '../site/SitePageNotFound';
import { useCompanyInfo } from '../../store/company/companyHooks';
import PostRepository from '../../api/postRepository';
import { PostPaginated } from './BlogPageCategory';
import { format } from 'date-fns';
import AppLink from '../shared/AppLink';
import PostCard, { PostCardLayout } from '../shared/PostCard';
import ContactForm from '../contact/ContactForm';

export type BlogPagePostLayout = 'classic' | 'full';

export type BlogPagePostSidebarPosition = 'start' | 'end';

export interface BlogPagePostProps {
    layout?: BlogPagePostLayout;
    sidebarPosition?: BlogPagePostSidebarPosition;
    post?: IPost;
}

export default function BlogPagePost(props: BlogPagePostProps) {
    const { layout = 'classic', sidebarPosition = 'start', post } = props;
    if (post === null) {
        return <SitePageNotFound />;
    }
    const companyInfo = useCompanyInfo();
    const postRepository = new PostRepository();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [postsFiltered, setPostsFiltered] = useState<IPost[]>([]);

    useEffect(() => {
        postRepository
            .getAllPosts()
            .then(({ data }) => {
                setPosts(data);
            })
            .catch(err => console.log(err));
    }, []);

    function searchBlog(searchInput: ChangeEvent): void {
        // @ts-ignore
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(searchInput.target.value.toLowerCase())
        );
        setPostsFiltered(filteredPosts);
    }

    function postRecently(postsList: IPost[]) {
        return postsList.map((post, index) => {
            const date = new Date(post.created_at);
            return index < 4 ? (
                <li key={post.id} className={'grid grid-cols-2 gap-x-2 my-4'}>
                    <div className={'col-start-1'}>
                        <AppLink href={`/blog/post/${post.slug}`}>
                            <img src={`${process.env.NEXT_PUBLIC_BASE_URI}${post.thumbnails.url}`} alt="" />
                        </AppLink>
                    </div>
                    <div className={'col-start-2'}>
                        <AppLink href={`/blog/post/${post.slug}`}>
                            <p className={'font-bold text-sm'}>{post.title}</p>
                        </AppLink>
                        <p className={'text-xs text-gray-500 '}>{format(date, 'MMMM-dd-yyyy').toString()}</p>
                    </div>
                </li>
            ) : null;
        });
    }

    function sectionPostsRecently() {
        return (
            <div className={'w-full'}>
                <div className={'md:pt-4'}>
                    <input type="text" onChange={searchBlog} className={'w-full form-control'} placeholder={'Buscar'} />
                </div>
                <h3 className={'text-xl text-black border-gray-300 border-b-4 mt-4 mb-3'}>Posts Recientes</h3>
                <ul>{postsFiltered.length > 0 ? postRecently(postsFiltered) : postRecently(posts)}</ul>
            </div>
        );
    }

    if (post) {
        return (
            <Fragment>
                <Head>
                    <title>{`${post?.title} — ${companyInfo.company_name}`}</title>
                </Head>
                <div className={'grid md:grid-cols-12 grid-cols-1 md:gap-x-6 gap-y-2 md:mx-24'}>
                    <div className={'hidden md:grid md:col-start-1 md:col-span-2'}>
                        <div className={'grid grid-cols-1 md:py-20'}>{sectionPostsRecently()}</div>
                    </div>

                    <div className="md:col-start-3 md:col-span-10 col-start-1">
                        <div className="row justify-content-center">
                            <div className={'col-md-12 col-lg-10 col-xl-10 pr-0'}>
                                <BlogPost layout={layout} post={post} />
                            </div>
                        </div>
                    </div>
                    <div className={'md:hidden col-start-1 '}>
                        <div className={'grid grid-cols-1 md:py-20'}>{sectionPostsRecently()}</div>
                    </div>
                </div>
                <ContactForm />
            </Fragment>
        );
    } else {
        return <SitePageNotFound />;
    }
}
