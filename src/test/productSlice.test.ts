/* eslint-disable jest/no-identical-title */
import { initialState } from "../miscs/types/ProductState";
import { Product } from "../miscs/types/types";
import productSlice, {
  fetchAllProducts,
  fetchProductById,
} from "../redux/slices/productSlice";

// Mock products data
const mockProducts: Product[] = [
  {
    _id: "1",
    title: "Product 1",
    price: 10,
    skinType: "Type A",
    description: "Description 1",
    image: ["image1.jpg", "image2.jpg"],
    categoryId: {
      _id: "1",
      name: "Category 1",
      image: "category1.jpg",
    },
  },
  {
    _id: "2",
    title: "Product 2",
    price: 20,
    skinType: "Type B",
    description: "Description 2",
    image: ["image3.jpg", "image4.jpg"],
    categoryId: {
      _id: "2",
      name: "Category 2",
      image: "category2.jpg",
    },
  },
  {
    _id: "3",
    title: "Product 3",
    price: 30,
    skinType: "Type C",
    description: "Description 3",
    image: ["image5.jpg", "image6.jpg"],
    categoryId: {
      _id: "1",
      name: "Category 1",
      image: "category1.jpg",
    },
  },
];

describe("productSlice", () => {
  test("should return initial state", () => {
    const expected = initialState;
    const received = productSlice.reducer(undefined, { type: "" });
    expect(received).toEqual(expected);
  });

  test("should update editProduct state", () => {
    const expected = { ...initialState, editProduct: mockProducts };
    const received = productSlice.reducer(initialState, {
      type: "updateEditProduct",
      payload: mockProducts,
    });
    expect(received).toEqual(expected);
  });

  test("should set loading to true and error to null on pending action", () => {
    const expected = { ...initialState, loading: true, error: null };
    const received = productSlice.reducer(initialState, {
      type: fetchAllProducts.pending.type,
    });
    expect(received).toEqual(expected);
  });

  // fulfilled
  test("should set loading to false and products on fulfilled action", () => {
    const expected = {
      ...initialState,
      loading: false,
      products: mockProducts,
    };
    const received = productSlice.reducer(initialState, {
      type: fetchAllProducts.fulfilled.type,
      payload: mockProducts,
    });
    expect(received).toEqual(expected);
  });

  // rejected
  test("should set loading to false and error on rejected action", () => {
    const mockError = new Error("Network Error");
    const expected = {
      ...initialState,
      loading: false,
      error: mockError.message,
    };
    const received = productSlice.reducer(initialState, {
      type: fetchAllProducts.rejected.type,
      error: mockError,
    });
    expect(received).toEqual(expected);
  });

  // Test fetchProductById extraReducers

  // pending
  test("should set loading to true and error to null on pending action", () => {
    const expected = { ...initialState, loading: true, error: null };
    const received = productSlice.reducer(initialState, {
      type: fetchProductById.pending.type,
    });
    expect(received).toEqual(expected);
  });

  // fulfilled
  test("should set loading to false and selectedProduct on fulfilled action", () => {
    const expected = {
      ...initialState,
      loading: false,
      selectedProduct: mockProducts[0],
    };
    const received = productSlice.reducer(initialState, {
      type: fetchProductById.fulfilled.type,
      payload: mockProducts[0],
    });
    expect(received).toEqual(expected);
  });

  // rejected
  test("should set loading to false and error on rejected action", () => {
    const mockError = new Error("Network Error");
    const expected = {
      ...initialState,
      loading: false,
      error: mockError.message,
    };
    const received = productSlice.reducer(initialState, {
      type: fetchProductById.rejected.type,
      error: mockError,
    });
    expect(received).toEqual(expected);
  });
});
