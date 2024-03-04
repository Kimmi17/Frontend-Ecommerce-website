import React from "react";
import { Link } from "react-router-dom";
import { ProductCardProps } from "../miscs/types";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageUrl] = product.images;

  return (
    <div className="w-full md:w-1/2 lg:w-1/4 p-4">
      <div className="border rounded-lg p-4 h-full font-serif">
        <h3 className="text-xl font-semibold mb-2">{product.title}</h3>

        <img
          src={imageUrl}
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
      </div>
    </div>
  );
};

export default ProductCard;
