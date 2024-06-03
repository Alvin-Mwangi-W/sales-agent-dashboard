import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Collection,
  GetCollectionData,
  GetInvoiceData,
  GetSchoolData,
  GetSignupData,
  GetMetricsData,
  Invoice,
} from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://sales-agent-dashboard-server.onrender.com" }),
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
    deleteInvoice: builder.mutation<void, Invoice>({
      query: (invoice) => ({
        url: `/invoices/${invoice.invoiceNumber}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoices"],
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
  useDeleteInvoiceMutation, 
  useGetMetricsQuery,
} = api;
