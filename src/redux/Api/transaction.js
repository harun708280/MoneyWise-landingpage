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
    allTransactionByEmail: builder.query({
      query: ({ email, type }) => `/transactions/email/${email}?type=${type || ''}`,
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
    }),
    updateTransaction: builder.mutation({ 
      query: ({ id, updatedData }) => ({
        url: `/transactions/edit/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["userTransactions"],
    }),
    incomeByEmailAndTotal: builder.query({
      query: (email) => `/transactions/income/total/${email}`,
      providesTags: ["userTransactions","Saving"],
    }),

    chartDataAnalyst:builder.query({
      query: (email) => `/transactions/chart-data/${email}`,
      providesTags: ["userTransactions"],
    })
  }),

  
});

export const { useAddTransactionMutation,useAllTransactionByEmailQuery,useDeleteTransactionMutation,useSingleTransactionQuery,useUpdateTransactionMutation,useIncomeByEmailAndTotalQuery,useChartDataAnalystQuery} = transactionApi;
