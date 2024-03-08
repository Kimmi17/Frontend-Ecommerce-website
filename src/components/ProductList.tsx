import React, { useState } from "react";
import { ProductListProps } from "../miscs/types/types";
import ProductCard from "./ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import filterSlice from "../redux/slices/filterSlice";
import { fetchAllProducts } from "../redux/slices/productSlice";

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const filters = useSelector((state: RootState) => state.filters.filters);

  const { categories, categoryId, priceRange, limit, offset } = useSelector(
    (state: RootState) => {
      return {
        categories: state.categories.categories,
        categoryId: state.filters.filters.categoryId,
        priceRange: state.filters.filters.priceRange,
        limit: state.filters.filters.limit,
        offset: state.filters.filters.offset,
      };
    }
  );

  const [currentPage, setCurrentPage] = useState(offset / 30 + 1);

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
      <div key={i} className="flex flex-wrap justify-center gap-4">
        {row.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  const goPrevious = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      await store.dispatch(
        filterSlice.actions.updateFilter({
          filters: {
            ...filters,
            offset: (currentPage - 2) * limit,
          },
        })
      );
      await store.dispatch(fetchAllProducts());
    }
  };

  const goNext = async () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
      await store.dispatch(
        filterSlice.actions.updateFilter({
          filters: {
            ...filters,
            offset: currentPage * limit,
          },
        })
      );
      await store.dispatch(fetchAllProducts());
    }
  };

  return (
    <div className="product-list">
      <div className="flex flex-wrap">{cardRows}</div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={goPrevious} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={goNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductList;
