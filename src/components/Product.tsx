import React from "react";
import useFetch from "../hook/useFetch";
import ProductList from "./ProductList";

const ProductComponent: React.FC = () => {
  const { data, loading, error } = useFetch(
    "https://api.escuelajs.co/api/v1/products"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <ProductList products={data} />;
};

export default ProductComponent;
