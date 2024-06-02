import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetCollectionData, GetInvoiceData, GetSchoolData, GetSignupData } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  reducerPath: "api",
  tagTypes: ["Signups", "Invoices", "Schools"],
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
      query: () => "/schools",
      providesTags: ["Schools"],
    }), 
  })
});

export const { useGetSignupsQuery, useGetInvoicesQuery, useGetSchoolsQuery, useGetCollectionsQuery } = api;
