export type OrderBy = "ACS" | "DECS" | null;

export interface FilterState {
  filters: {
    categoryId: string | null;
    orderBy: OrderBy;
    limit: number;
    offset: number;
  };
}

export const initialState: FilterState = {
  filters: {
    categoryId: null,
    orderBy: null,
    limit: 24,
    offset: 0,
  },
};
