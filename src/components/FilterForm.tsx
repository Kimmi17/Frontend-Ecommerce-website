import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import { Button } from "./ui/button";
import filterSlice from "../redux/slices/filterSlice";
import { fetchAllProducts } from "../redux/slices/productSlice";

interface FilterFormProps {
  onSubmit: (filters: {
    minPrice: number;
    maxPrice: number;
    categoryId: number;
  }) => void;
  categories: { id: number; name: string }[];
}

const FilterForm: React.FC = () => {
  const { categories, categoryIdx, priceRange, limit, offset } = useSelector(
    (state: RootState) => {
      return {
        categories: state.categories.categories,
        categoryIdx: state.filters.filters.categoryId,
        priceRange: state.filters.filters.priceRange,
        limit: state.filters.filters.limit,
        offset: state.filters.filters.offset,
      };
    }
  );

  const [minPrice, setMinPrice] = useState<number>(priceRange?.[0] || 0);
  const [maxPrice, setMaxPrice] = useState<number>(priceRange?.[1] || 0);
  const [categoryId, setCategoryId] = useState(categoryIdx || 0);

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(Number(e.target.value));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.dispatch(
      filterSlice.actions.updateFilter({
        filters: {
          priceRange: !minPrice && !maxPrice ? null : [minPrice, maxPrice],
          categoryId: categoryId.toString(),
          limit,
          offset,
        },
      })
    );
    store.dispatch(fetchAllProducts());
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex gap-4 items-center">
          <h2 className="text-2xl font-semibold mb-4 mr-4">Filter Products</h2>
          <div className="mb-4">
            <label
              htmlFor="minPrice"
              className="block text-gray-700 font-semibold"
            >
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="mt-1 px-4 py-2 block w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="maxPrice"
              className="block text-gray-700 font-semibold"
            >
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="mt-1 px-4 py-2 block w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-semibold"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={categoryId}
              onChange={handleCategoryChange}
              className="mt-1 px-4 py-2 block w-full border rounded-md"
              required
            >
              <option value={0}>All</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" variant={"outline"}>
            Apply Filters
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FilterForm;
