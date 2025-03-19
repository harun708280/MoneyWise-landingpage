import { baseApi } from "./baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTransaction: builder.mutation({
      query: (transactionData) => ({
        url: "/transactions/add", 
        method: "POST",
        body: transactionData, 
      }),
    }),
  }),
});

export const { useAddTransactionMutation } = transactionApi;
