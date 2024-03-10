import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import { fetchAllProducts } from "../redux/slices/productSlice";
import ProductList from "./ProductList";
import FilterForm from "./FilterForm";

const Product = () => {
  const dispatch = store.dispatch;
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <FilterForm />
      <ProductList />
    </div>
  );
};

export default Product;
