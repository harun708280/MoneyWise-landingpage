import { baseApi } from "./baseApi";

export const savingApi = baseApi.injectEndpoints({
  
  endpoints: (builder) => ({
    userSaving: builder.mutation({
      query: (savingData) => ({
        url: "/savings/add",
        method: "POST",
        body: savingData,
      }),
      invalidatesTags: ["Saving"], // Properly defining the tag as a string
    }),
    getUserSavingsByEmail: builder.query({
      query: (email) => `/savings/email/${email}`,
      providesTags: ["Saving"], // Corrected providesTags
    }),
    getSavingById: builder.query({
      query: (id) => `/savings/${id}`,
      providesTags: (result, error, id) => [{ type: "Saving", id }], // Fixing the type name
    }),
    updateSaving: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/savings/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Saving"], // Properly invalidating the tag
    }),
    deleteSaving: builder.mutation({
      query: (id) => ({
        url: `/savings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Saving"], // Properly invalidating the tag
    }),
  }),
});

export const {
  useUserSavingMutation,
  useGetUserSavingsByEmailQuery,
  useGetSavingByIdQuery,
  useUpdateSavingMutation,
  useDeleteSavingMutation,
} = savingApi;
