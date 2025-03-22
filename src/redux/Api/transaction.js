import { baseApi } from "./baseApi";

export const transactionApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    
    addTransaction: builder.mutation({
      query: (transactionData) => ({
        url: "/transactions/add", 
        method: "POST",
        body: transactionData, 
      }),
      invalidatesTags:["userTransactions"]
    }),
    allTransactionByEmail:builder.query({
      query:(email)=>`/transactions/email/${email}`,
      providesTags: ["userTransactions"], 
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["userTransactions"],
    }),
    singleTransaction:builder.query({
      query:(id)=>`/transactions/${id}`,
    })

  }),
});

export const { useAddTransactionMutation,useAllTransactionByEmailQuery,useDeleteTransactionMutation,useSingleTransactionQuery} = transactionApi;
