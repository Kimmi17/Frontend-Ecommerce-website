export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  skinType: string;
  description: string;
  image: string[];
  categoryId: Category;
}

export interface ProductResponse {
  totalProduct: number;
  products: Product[];
}

export interface ProductCardProps {
  id: string;
  title: string;
  image: string[];
  price: number;
}

export interface ProductListProps {
  products: Product[];
}

export interface CategoryCardProps {
  id: string;
  image: string;
  name: string;
  onClick?: () => void;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SearchBarProps {
  setSearchTerm: (value: string) => void;
  searchTerm: string;
}

export interface NavbarProps {
  setSearchTerm: (query: string) => void;
  searchTerm: string;
}

export interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
