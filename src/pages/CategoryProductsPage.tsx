import React, { useEffect } from "react";
import store, { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { fetchProductsByCategory } from "../redux/slices/categorySlice";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

type Props = {};

const CategoryProductsPage = (props: Props) => {
  const { categoryId } = useParams();

  const { dispatch } = store;

  const products = useSelector((state: RootState) => state.categories.products);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [categoryId, dispatch]);

  return (
    <div className="flex flex-wrap">
      {products.map((p) => (
        <ProductCard product={p} />
      ))}
    </div>
  );
};

export default CategoryProductsPage;
