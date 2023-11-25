import { ApolloClient, InMemoryCache } from '@apollo/client';

import {GetPosts as  GET_POSTS_QUERY}  from './graphql/queries/getPosts.gql';
import {GetPostsPerPage as GET_POSTS_PER_PAGE_QUERY} from './graphql/queries/getPostsPerPage.gql';
import {GetCategories as GET_CATEGORIES_QUERY} from './graphql/queries/getCategories.gql';
import {GetPostDetails as GET_POST_DETAILS_QUERY} from './graphql/queries/getPostDetails.gql';
import {GetSimilarPosts as GET_SIMILAR_POSTS_QUERY} from './graphql/queries/getSimilarPosts.gql';
import {GetAdjacentPosts as GET_ADJACENT_POSTS_QUERY} from './graphql/queries/getAdjacentPosts.gql';
import {GetCategoryPost as GET_CATEGORY_POST_QUERY} from './graphql/queries/getCategoryPost.gql';
import {GetFeaturedPosts as GET_FEATURED_POSTS_QUERY} from './graphql/queries/getFeaturedPosts.gql';
import {GetComments as GET_COMMENTS_QUERY} from './graphql/queries/getComments.gql';
import {GetSite as GET_SITE_QUERY} from './graphql/queries/getSite.gql';
import {GetRecentPosts as GET_RECENT_POSTS_QUERY} from './graphql/queries/getRecentPosts.gql';

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    cache: new InMemoryCache(),
    connectToDevTools: true
});

export const getPosts = async () => {
    
    const { data } = await client.query({ query: GET_POSTS_QUERY });
    return data.posts;
};

export const getPostsPerPage = async (pageNumber) => {
    const first = parseInt(process.env.POSTS_PER_PAGE);
    const skip = (pageNumber - 1) * first;

    const { data } = await client.query({
        query: GET_POSTS_PER_PAGE_QUERY,
        variables: { first, skip },
    });
    return data.postsConnection.edges;
};

export const getCategories = async () => {
    const { data } = await client.query({ query: GET_CATEGORIES_QUERY });
    return data.categories;
};

export const getPostDetails = async (slug) => {
    const { data } = await client.query({
        query: GET_POST_DETAILS_QUERY,
        variables: { slug },
    });
    return data.post;
};

export const getSimilarPosts = async (categories, slug) => {
    const { data } = await client.query({
        query: GET_SIMILAR_POSTS_QUERY,
        variables: { categories, slug },
    });
    return data.posts;
};

export const getAdjacentPosts = async (createdAt, slug) => {
    const { data } = await client.query({
        query: GET_ADJACENT_POSTS_QUERY,
        variables: { createdAt, slug },
    });
    return { next: data.next[0], previous: data.previous[0] };
};

export const getCategoryPost = async (slug) => {
    const { data } = await client.query({
        query: GET_CATEGORY_POST_QUERY,
        variables: { slug },
    });
    return data.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
    const { data } = await client.query({ query: GET_FEATURED_POSTS_QUERY });
    return data.posts;
};

export const getComments = async (slug) => {
    const { data } = await client.query({
        query: GET_COMMENTS_QUERY,
        variables: { slug },
    });
    return data.comments;
};

export const getRecentPosts = async () => {
    const { data } = await client.query({ query: GET_RECENT_POSTS_QUERY });
    return data.posts;
};

export const getSite = async (locale = 'es') => {
    
    const { data } = await client.query({
        query: GET_SITE_QUERY,
        variables: { locales: [locale] },
    });
    return data.site;
};

export const submitComment = async (obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });

    return result.json();
};
