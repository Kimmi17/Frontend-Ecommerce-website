export interface Category {
  id: number;
  name: string;
  image: string;
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
  id: number;
  title: string;
  images: string[];
  price: number;
}

export interface ProductListProps {
  products: Product[];
}

export interface CategoryCardProps {
  id: number;
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
