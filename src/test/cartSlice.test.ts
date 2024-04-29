import cartSlice, {
  addProductsToCart,
  removeProductsToCart,
} from "../redux/slices/cartSlice";
import { Product } from "../miscs/types/types";
import { initialState } from "../miscs/types/CartState";

const mockProduct1: Product = {
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
};

const mockProduct2: Product = {
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
};

describe("cartSlice", () => {
  // Test initial state
  test("should return initial state", () => {
    const expected = initialState;
    const received = cartSlice.reducer(undefined, { type: "" });
    expect(received).toEqual(expected);
  });

  // Test addProductsToCart reducer
  test("should add a new product to the cart", () => {
    const expected = { products: [{ ...mockProduct1, quantity: 1 }] };
    const received = cartSlice.reducer(
      initialState,
      addProductsToCart(mockProduct1._id)
    );
    expect(received).toEqual(expected);
  });

  test("should decrement quantity for existing product", () => {
    const existingState = {
      products: [{ id: mockProduct1._id, quantity: 2 }],
      productData: [],
      loading: false,
      error: null,
    };
    const expected = {
      products: [{ id: mockProduct1._id, quantity: 1 }], // Add id property
      productData: [],
      loading: false,
      error: null,
    };
    const received = cartSlice.reducer(
      existingState,
      removeProductsToCart(mockProduct1._id)
    );
    expect(received).toEqual(expected);
  });

  test("should remove product from cart if quantity reaches 0", () => {
    const existingState = {
      products: [
        { id: mockProduct1._id, quantity: 1 }, // Add id property
        { id: mockProduct2._id, quantity: 0 }, // Update quantity to 0
      ],
      productData: [],
      loading: false,
      error: null,
    };
    const expected = {
      products: [{ id: mockProduct1._id, quantity: 1 }],
      productData: [],
      loading: false,
      error: null,
    };
    const received = cartSlice.reducer(
      existingState,
      removeProductsToCart(mockProduct2._id) // Remove mockProduct2 from the cart
    );
    expect(received).toEqual(expected);
  });
});
