import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const localData = [
  { id: 1, n: "Alan Wake", c: ["TPS", "Adventure", "Horror"] },
  { id: 2, n: "Jason Bourne", c: ["Movie", "Thriller", "Spy"] },
  { id: 3, n: "Bruce Wayne", c: ["Batman", "Philanthropist", "Orphan"] },
];

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getItems: builder.query<any[], void>({
      queryFn: () => ({ data: localData }),
    }),
  }),
});

export const { useGetItemsQuery } = api;
