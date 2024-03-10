import { initialState } from "../miscs/types/ProductState";
import { Product } from "../miscs/types/types";
import productSlice, {
  fetchAllProducts,
  fetchProductById,
} from "../redux/slices/productSlice";

const mockProduct1: Product = {
  id: 1,
  title: "Product 1",
  price: 10.0,
  description: "A nice product",
  category: {
    id: 1,
    name: "Electronics",
    creationAt: "2024-03-08",
    updatedAt: "2024-03-08",
    image: "image1.jpg",
  },
  images: ["img1.jpg"],
  creationAt: "2024-03-08",
  updatedAt: "2024-03-08",
};
const mockProduct2: Product = {
  id: 2,
  title: "Product 2",
  price: 20.0,
  description: "An even better product",
  category: {
    id: 2,
    name: "Clothing",
    creationAt: "2024-03-08",
    updatedAt: "2024-03-08",
    image: "image2.jpg",
  },
  images: ["img2.jpg", "img3.jpg"],
  creationAt: "2024-03-08",
  updatedAt: "2024-03-08",
};
const mockProducts: Product[] = [mockProduct1, mockProduct2];

describe("productSlice", () => {
  // Test initial state
  test("should return initial state", () => {
    const expected = initialState;
    const received = productSlice.reducer(undefined, { type: "" });
    expect(received).toEqual(expected);
  });

  // Test updateEditProduct reducer
  test("should update editProduct state", () => {
    const expected = { ...initialState, editProduct: mockProduct1 };
    const received = productSlice.reducer(initialState, {
      type: "updateEditProduct",
      payload: mockProduct1,
    });
    expect(received).toEqual(expected);
  });

  // Test fetchAllProducts extraReducers

  // pending
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

  // pending
  // eslint-disable-next-line jest/no-identical-title
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
      selectedProduct: mockProduct1,
    };
    const received = productSlice.reducer(initialState, {
      type: fetchProductById.fulfilled.type,
      payload: mockProduct1,
    });
    expect(received).toEqual(expected);
  });

  // rejected
  // eslint-disable-next-line jest/no-identical-title
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
