import React, { useState } from "react";
import { Product } from "../miscs/types/types";
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
import filterSlice, { getFiltersState } from "../redux/slices/filterSlice";
import { fetchAllProducts } from "../redux/slices/productSlice";

const ProductList: React.FC = () => {
  const filters = useSelector(
    (state: RootState) => getFiltersState(state).filters
  );

  const products = useSelector((state: RootState) => state.products.products);

  const { limit, offset, filterOrderBy, categoryId } = useSelector(
    (state: RootState) => {
      return {
        limit: state.filters.filters.limit,
        offset: state.filters.filters.offset,
        filterOrderBy: state.filters.filters.orderBy,
        categoryId: state.filters.filters.categoryId,
      };
    }
  );

  const [currentPage, setCurrentPage] = useState(offset / 24 + 1);

  // Ensure products is an array before proceeding
  if (!Array.isArray(products)) {
    return <div>No products to display</div>;
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
  };

  const sortProduct = (a: Product, b: Product) => {
    switch (filterOrderBy) {
      case "ACS":
        return a.price - b.price;
      case "DECS":
        return b.price - a.price;
      default:
        return 0;
    }
  };

  return (
    <div className="product-list">
      {!categoryId && (
        <Pagination className="mt-10">
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
      )}
      <div className="flex flex-wrap">
        {[...products].sort(sortProduct).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            price={product.price}
            title={product.title}
            images={product.images}
          />
        ))}
      </div>
      {!categoryId && (
        <Pagination className="my-4">
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
      )}
    </div>
  );
};

export default ProductList;
