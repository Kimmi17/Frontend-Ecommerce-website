import React from "react";
import { ProductListProps } from "../miscs/types/types";
import ProductCard from "./ProductCard";

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  // Ensure products is an array before proceeding
  if (!Array.isArray(products)) {
    return <div>No products to display</div>;
  }

  // Define the number of cards to show in each row
  const numCardsPerRow = 3;

  const cardRows = [];
  for (let i = 0; i < products.length; i += numCardsPerRow) {
    const row = products.slice(i, i + numCardsPerRow);
    cardRows.push(
      <div key={i} className="flex justify-center gap-4">
        {row.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return <div className="product-list">{cardRows}</div>;
};

export default ProductList;
