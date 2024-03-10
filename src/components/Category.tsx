import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import { fetchCategories } from "../redux/slices/categorySlice";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const dispatch = store.dispatch;

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const loading = useSelector((state: RootState) => state.categories.loading);
  const error = useSelector((state: RootState) => state.categories.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Categories</h2>
      <div className="flex flex-wrap">
        {categories.map((c) => (
          <CategoryCard key={c.id} id={c.id} name={c.name} image={c.image} />
        ))}
      </div>
    </div>
  );
};

export default Category;
