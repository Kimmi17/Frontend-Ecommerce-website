import React from "react";
import { Link } from "react-router-dom";
import { ProductCardProps } from "../miscs/types/types";
import store from "../redux/store";
import cartSlice from "../redux/slices/cartSlice";
import { toast } from "./ui/use-toast";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const user = store.getState().user.currentUser;
  const isAdmin = user?.role === "admin";
  const addProductToCart = () => {
    store.dispatch(cartSlice.actions.addProductsToCart(product));
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart`,
      duration: 3000,
    });
  };

  return (
    <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <div className="border rounded-lg p-4 h-full font-serif">
        <h3 className="text-xl font-semibold mb-2">{product.title}</h3>

        <img
          src={product.images[0]}
          alt={product.title}
          className="mb-2"
          style={{ width: "100%", height: "auto" }}
        />
        <p className="mb-1">
          <span className="font-semibold">Price:</span> ${product.price}
        </p>
        <Link
          to={`/products/${product.id}`}
          className="text-black font-semibold font-serif py-2 px-4 rounded-lg inline-block mt-2"
        >
          View Detail
        </Link>
        {!isAdmin && (
          <button
            className="text-black font-semibold font-serif py-2 px-4 rounded-lg inline-block mt-2"
            onClick={addProductToCart}
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
