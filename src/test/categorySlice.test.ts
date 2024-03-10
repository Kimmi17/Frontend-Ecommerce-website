import { initialState } from "../miscs/types/CategoryState";
import { Category, Product } from "../miscs/types/types";
import categorySlice, {
  fetchCategories,
  fetchProductsByCategory,
} from "../redux/slices/categorySlice";

// Mock data
const mockCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    creationAt: "2024-03-08",
    updatedAt: "2024-03-08",
    image: "image1.jpg",
  },
  {
    id: 2,
    name: "Electronics",
    creationAt: "2024-03-08",
    updatedAt: "2024-03-08",
    image: "image1.jpg",
  },
];
const mockProducts: Product[] = [
  {
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
  },

  {
    id: 2,
    title: "Product 2",
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
  },
];

describe("categorySlice", () => {
  // Test initial state
  test("should return initial state", () => {
    const expected = initialState;
    const received = categorySlice.reducer(undefined, { type: "" });
    expect(received).toEqual(expected);
  });

  // Test fetchCategories thunk
  test("fetchCategories pending sets loading to true and error to null", () => {
    const state = initialState;
    const expected = { ...state, loading: true, error: null };
    const received = categorySlice.reducer(state, {
      type: fetchCategories.pending.type,
    });
    expect(received).toEqual(expected);
  });

  test("fetchCategories fulfilled sets loading to false and updates categories", () => {
    const state = initialState;
    const expected = { ...state, loading: false, categories: mockCategories };
    const received = categorySlice.reducer(state, {
      type: fetchCategories.fulfilled.type,
      payload: mockCategories,
    });
    expect(received).toEqual(expected);
  });

  test("fetchCategories rejected sets loading to false and updates error", () => {
    const state = initialState;
    const expected = {
      ...state,
      loading: false,
      error: "Error fetching categories",
    };
    const received = categorySlice.reducer(state, {
      type: fetchCategories.rejected.type,
      error: new Error("Error fetching categories"),
    });
    expect(received).toEqual(expected);
  });

  test("fetchProductsByCategory pending sets loading to true and error to null", () => {
    const state = initialState;
    const expected = { ...state, loading: true, error: null, products: [] };
    const received = categorySlice.reducer(state, {
      type: fetchProductsByCategory.pending.type,
    });
    expect(received).toEqual(expected);
  });

  test("fetchProductsByCategory fulfilled sets loading to false and updates products", () => {
    const state = initialState;
    const expected = { ...state, loading: false, products: mockProducts };
    const received = categorySlice.reducer(state, {
      type: fetchProductsByCategory.fulfilled.type,
      payload: mockProducts,
    });
    expect(received).toEqual(expected);
  });

  test("fetchProductsByCategory rejected sets loading to false and updates error", () => {
    const state = initialState;
    const expected = {
      ...state,
      loading: false,
      error: "Error fetching products for category",
    };
    const received = categorySlice.reducer(state, {
      type: fetchProductsByCategory.rejected.type,
      error: new Error("Error fetching products for category"),
    });
    expect(received).toEqual(expected);
  });
});
