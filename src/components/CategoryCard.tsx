// CategoryCard.tsx

import React from "react";
import { CategoryCardProps } from "../miscs/types/types";
import { Link } from "react-router-dom";

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image }) => {
  return (
    <div className="relative w-full md:w-1/2 lg:w-1/4 p-4">
      <div className="border p-4 h-full dark:text-white dark:opacity-85 rounded-xl overflow-hidden">
        <img
          src={image}
          alt=""
          className="w-full h-auto rounded-md transition-opacity duration-300 hover:opacity-100"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "https://via.placeholder.com/300";
          }}
        />
        <div className="absolute inset-0 p-4">
          <div className="h-full flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-400 p-8 bg-gray-400 dark:bg-gray-800 bg-opacity-90 rounded-xl">
            <h3 className="text-xl font-semibold mb-2 text-white">{name} </h3>
            <Link
              to={`/category/${id}`}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
