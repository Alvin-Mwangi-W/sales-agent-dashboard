import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Collection,
  GetCollectionData,
  GetInvoiceData,
  GetSchoolData,
  GetSignupData,
  GetMetricsData,
} from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  reducerPath: "api",
  tagTypes: ["Signups", "Invoices", "Schools", "Collections", "Metrics"],
  endpoints: (builder) => ({
    getSignups: builder.query<GetSignupData, void>({
      query: () => "/signupData",
      providesTags: ["Signups"],
    }),
    getInvoices: builder.query<GetInvoiceData, void>({
      query: () => "/invoices",
      providesTags: ["Invoices"],
    }),
    getSchools: builder.query<GetSchoolData, void>({
      query: () => "/schools",
      providesTags: ["Schools"],
    }),
    getCollections: builder.query<GetCollectionData, void>({
      query: () => "/collections",
      providesTags: ["Collections"],
    }),
    updateCollectionStatus: builder.mutation<
      Collection,
      Partial<Collection> & Pick<Collection, "collectionNumber">
    >({
      query: ({ collectionNumber, ...patch }) => ({
        url: `/collections/${collectionNumber}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Collections"],
    }),
    getMetrics: builder.query<GetMetricsData, void>({
      query: () => "/metrics",
      providesTags: ["Metrics"],
    }),
  }),
});

export const {
  useGetSignupsQuery,
  useGetInvoicesQuery,
  useGetSchoolsQuery,
  useGetCollectionsQuery,
  useUpdateCollectionStatusMutation,
  useGetMetricsQuery,
} = api;
