import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl:'https://moneywise-server-fzkt.onrender.com/api'}), 
  tagTypes: ["userTransactions","Saving"],  
  endpoints: () => ({}),
});

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({ baseUrl:'https://moneywise-server.up.railway.app/api'}), 
//   tagTypes: ["userTransactions","Saving"],  
//   endpoints: () => ({}),
// });