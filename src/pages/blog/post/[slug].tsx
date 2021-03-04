import BlogPagePost from '../../../components/blog/BlogPagePost';

import {GetServerSideProps} from "next";

import {IPost} from "../../../interfaces/post";
import PostRepository from "../../../api/postRepository";
import SitePageNotFound from "../../../components/site/SitePageNotFound";
import React from "react";


export interface PageProps {
    post: IPost | null;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    let post: IPost | null = null;
    if (typeof context.params?.slug === 'string') {
        const {slug} = context.params;
        const postRepository = new PostRepository()
        await postRepository.getPostBySlug(slug).then(({data}) => {
            post = data[0];
        });
    }

    return {
        props: {
            post
        },
    };
};


function Page({post}: PageProps) {
    if (post === null) {
        return <SitePageNotFound/>;
    }
    return <BlogPagePost layout="full" post={post}/>;
}

export default Page;
