import React, { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import filterSlice from "../redux/slices/filterSlice";
import { fetchAllProducts } from "../redux/slices/productSlice";
import { OrderBy } from "../miscs/types/FilterState";

const FilterForm: React.FC = () => {
  const { categories, filterCategoryId, filterOrderBy, limit, offset } =
    useSelector((state: RootState) => ({
      categories: state.categories.categories,
      filterCategoryId: state.filters.filters.categoryId,
      filterOrderBy: state.filters.filters.orderBy,
      limit: state.filters.filters.limit,
      offset: state.filters.filters.offset,
    }));

  const [categoryId, setCategoryId] = useState(filterCategoryId || "ALL");
  const [orderBy, setOrderBy] = useState(filterOrderBy);

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value as OrderBy);
    store.dispatch(
      filterSlice.actions.updateFilter({
        filters: {
          categoryId: categoryId,
          orderBy: e.target.value as OrderBy,
          limit,
          offset,
        },
      })
    );
    store.dispatch(fetchAllProducts());
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
    store.dispatch(
      filterSlice.actions.updateFilter({
        filters: {
          categoryId: e.target.value,
          orderBy,
          limit,
          offset,
        },
      })
    );
    store.dispatch(fetchAllProducts());
  };

  return (
    <div className="flex items-center justify-center dark:bg-slate-800">
      <div className="p-8 rounded-xl shadow-md dark:bg-slate-500">
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl font-semibold dark:text-gray-300 mb-4 mr-4">
            Filter Products
          </h2>
          <div className="mb-4">
            <label
              htmlFor="orderBy"
              className="block text-gray-700 font-semibold dark:text-white dark:opacity-70"
            >
              Order By
            </label>
            <select
              id="orderBy"
              value={orderBy || ""}
              onChange={handleOrderByChange}
              className="mt-1 px-4 py-2 block w-full border rounded"
            >
              <option value="">Default</option>
              <option value="ACS">Ascending</option>
              <option value="DECS">Descending</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-semibold dark:text-white dark:opacity-70"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={categoryId}
              onChange={handleCategoryChange}
              className="mt-1 px-4 py-2 block w-full border rounded"
              required
            >
              <option value={"ALL"}>All</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
