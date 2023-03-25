import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { original } from '@reduxjs/toolkit';

const API_KEY = 'AIzaSyBXvbzQfXfUbvwyMKBz7UvISlxxwXN7tp0';
export const pagination = 30;
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1/',
  }),
  endpoints: (builder) => ({
    fetchBooksByCategory: builder.query({
      query: (obj) =>
        `volumes?q=${obj.name}${
          obj.category !== 'all' ? `+subject:${obj.category}` : ''
        }${
          obj.order !== 'relevance' ? `&orderBy=${obj.order}` : ''
        }&maxResults=${pagination}&key=${API_KEY}`,
    }),
    loadMore: builder.query({
      query: (obj) =>
        `volumes?q=${obj.name}${
          obj.category !== 'all' ? `+subject:${obj.category}` : ''
        }${
          obj.order !== 'relevance' ? `&orderBy=${obj.order}` : ''
        }&maxResults=${pagination}&startIndex=${obj.index}&key=${API_KEY}`,
      serializeQueryArgs: ({ endpointName }) => {
        // console.log(endpointName);
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        // console.log(newItems);
        currentCache.items.push(...newItems.items);
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        // console.log(currentArg, previousArg);
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useLazyFetchBooksByCategoryQuery, useLazyLoadMoreQuery } = api;
