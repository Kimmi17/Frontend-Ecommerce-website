import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Product } from "../miscs/types/types";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import { toast } from "./ui/use-toast";
import { fetchProductById } from "../redux/slices/productSlice";
import { cn } from "../lib/utils";
import clsx from "clsx";

interface ProductFormProps {
  modalMode?: "EDIT" | "CREATE";
  product?: Product;
  submitCb?: () => void;
}

const initialProduct: Product = {
  _id: "",
  title: "",
  price: 0,
  description: "",
  skinType: "",
  categoryId: {
    _id: "",
    name: "",
    image: "",
  },
  image: [],
};

const ProductForm: React.FC<ProductFormProps> = ({
  product = initialProduct,
  modalMode = "CREATE",
  submitCb,
}) => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [title, setTitle] = useState<string>(product?.title || "");
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [description, setDescription] = useState<string>(
    product?.description || ""
  );
  const [categoryId, setCategoryId] = useState<string>(
    product?._id || categories[0]._id
  );
  const [images, setImages] = useState<string[]>(product?.image || []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCategoryIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setImages([...images, e.target.value]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        title,
        price,
        description,
        categoryId: categories.find((c) => c._id === categoryId)?._id,
        images: images.map((image) => {
          return image.replace(/^\["|"\]$/g, "");
        }),
      };

      if (product._id) {
        let accessToken = localStorage.getItem("accessToken");
        await axios.put(
          `http://localhost:8080/api/v1/products/${product._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (submitCb) {
          submitCb();
        }
      } else {
        let accessToken = localStorage.getItem("accessToken");
        await axios.post("http://localhost:8080/api/v1/products/", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (submitCb) {
          submitCb();
        }
      }

      toast({
        title: "Product saved",
        description: "Product has been saved successfully",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md min-w-[300px]">
      <h2 className="text-2xl font-semibold mb-4">
        {modalMode === "EDIT" ? "Update Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 px-4 py-2 block w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handlePriceChange}
            className="mt-1 px-4 py-2 block w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            className="mt-1 px-4 py-2 block w-full border rounded-md  min-h-[180px]"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="categoryId"
            className="block text-gray-700 font-semibold"
          >
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={categoryId}
            onChange={handleCategoryIdChange}
            className="mt-1 px-4 py-2 block w-full border rounded-md"
            required
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={cn("mb-4", modalMode === "EDIT" && "hidden")}>
          <label htmlFor="images" className="block text-gray-700 font-semibold">
            Image URLs
          </label>
          <input
            type="text"
            id="images-urls"
            name="images"
            multiple
            onChange={handleImagesChange}
            className="mt-1 px-4 py-2 block w-full border rounded-md"
          />
        </div>
        <div className={cn("mb-4 flex", modalMode === "EDIT" && "hidden")}>
          {images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl.replace(/^\["|"\]$/g, "")}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://via.placeholder.com/300";
              }}
              alt=""
              className="w-20 h-20 mr-2 rounded-md"
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {product ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
