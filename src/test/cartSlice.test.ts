import cartSlice, {
  addProductsToCart,
  removeProductsToCart,
} from "../redux/slices/cartSlice";
import { Product } from "../miscs/types/types";
import { initialState } from "../miscs/types/CartState";

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
    image: ["image1.jpg"],
  },
  // quantity: 1,
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
    image: ["image2.jpg", "image3.jpg"],
  },
  // quantity: 1,
  images: ["img2.jpg", "img3.jpg"],
  creationAt: "2024-03-08",
  updatedAt: "2024-03-08",
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
    const expected = { products: [mockProduct1] };
    const received = cartSlice.reducer(
      initialState,
      addProductsToCart(mockProduct1)
    );
    expect(received).toEqual(expected);
  });

  // Test removeProductsToCart reducer
  test("should decrement quantity for existing product", () => {
    const existingState = { products: [{ ...mockProduct1, quantity: 2 }] };
    const expected = { products: [{ ...mockProduct1, quantity: 1 }] };
    const received = cartSlice.reducer(
      existingState,
      removeProductsToCart(mockProduct1.id)
    );
    expect(received).toEqual(expected);
  });

  test("should remove product from cart if quantity reaches 0", () => {
    const existingState = { products: [{ ...mockProduct1, quantity: 1 }] };
    const expected = { products: [] };
    const received = cartSlice.reducer(
      existingState,
      removeProductsToCart(mockProduct1.id)
    );
    expect(received).toEqual(expected);
  });
});
