export interface FilterState {
  filters: {
    priceRange: number[] | null;
    categoryId: string | null;
    limit: number;
    offset: number;
  };
}

export const initialState: FilterState = {
  filters: {
    priceRange: null,
    categoryId: null,
    limit: 30,
    offset: 0,
  },
};
