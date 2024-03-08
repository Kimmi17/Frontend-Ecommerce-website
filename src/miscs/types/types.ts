export interface Category {
  id: number;
  name: string;
  image: string[];
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductListProps {
  products: Product[];
}

export interface CategoryCardProps {
  category: Category;
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
