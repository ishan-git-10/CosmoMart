import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    getProductDetail: builder.query({
      query: (productId) => ({
        url: PRODUCTS_URL + "/" + productId,
      }),
      keepUnusedDataFor: 5,
    }),
    getSearchProducts: builder.query({
      query: (searchItem) => ({
        url: PRODUCTS_URL + "/search/" + searchItem,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: PRODUCTS_URL + "/" + productId,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URL + "/" + data.productId,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URL + "/" + data.productId + "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useGetSearchProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useCreateReviewMutation,
} = productsApiSlice;
