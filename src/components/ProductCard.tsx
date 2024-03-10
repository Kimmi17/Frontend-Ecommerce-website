import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProductCardProps } from "../miscs/types/types";
import store from "../redux/store";
import cartSlice from "../redux/slices/cartSlice";
import { toast } from "./ui/use-toast";
import { extractUrlFromString } from "../lib/utils";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  price,
  title,
  images,
}) => {
  const user = store.getState().user.currentUser;
  const isAdmin = user?.role === "admin";
  const addProductToCart = () => {
    store.dispatch(cartSlice.actions.addProductsToCart(id));
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart`,
      duration: 3000,
    });
  };

  return (
    <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <div className="border rounded-xl p-4 h-full">
        <h3 className="text-xl font-bold dark:text-gray-300 mb-2">{title}</h3>

        <img
          src={extractUrlFromString(images[0])}
          alt={title}
          className="mb-2"
          style={{ width: "100%", height: "auto" }}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "https://via.placeholder.com/300";
          }}
        />
        <div className="mb-4 flex flex-col">
          <div className="flex items-center">
            <span className="font-bold text-gray-900 dark:text-gray-300 mr-2">
              Price:
            </span>
            <span style={{ color: "gray" }}>${price}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
            <Link
              to={`/products/${id}`}
              className="text-black font-bold py-2 px-4 rounded-xl inline-block border border-gray-500 bg-blue-300 hover:bg-gray-200"
            >
              View Detail
            </Link>
            {!isAdmin && (
              <button
                className="text-black font-bold py-2 px-4 rounded-xl inline-block border border-gray-500 bg-blue-300 hover:bg-gray-200"
                onClick={addProductToCart}
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
