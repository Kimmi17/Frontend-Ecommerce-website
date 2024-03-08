// CategoryCard.tsx

import React from "react";
import { CategoryCardProps } from "../miscs/types/types";
import { Link } from "react-router-dom";

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [imageUrl] = category.image;
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 p-4">
      <div className="border rounded-lg p-4 h-full font-serif">
        <h3 className="text-xl font-semibold mb-2">{category.name}</h3>

        <img src={imageUrl} alt="" />
        <Link to={`/category/${category.id}`}>Shop Now</Link>

        <button>add</button>
      </div>
    </div>
  );
};

export default CategoryCard;
