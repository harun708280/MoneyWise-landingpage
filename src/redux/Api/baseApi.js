import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl:'https://fund-flow-server.vercel.app/api'}), 
  tagTypes: ["userTransactions","Saving"],  
  endpoints: () => ({}),
});
