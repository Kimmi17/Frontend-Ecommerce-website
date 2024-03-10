import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Product } from "../miscs/types/types";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import { toast } from "./ui/use-toast";
import { fetchProductById } from "../redux/slices/productSlice";

interface ProductFormProps {
  product?: Product;
}

const initialProduct: Product = {
  id: 0,
  title: "",
  price: 0,
  description: "",
  category: {
    id: 0,
    name: "",
    image: [],
    creationAt: "",
    updatedAt: "",
  },
  images: [""],
  creationAt: "",
  updatedAt: "",
};

const ProductForm: React.FC<ProductFormProps> = ({
  product = initialProduct,
}) => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const dispatch = store.dispatch;

  const [title, setTitle] = useState<string>(product?.title || "");
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [description, setDescription] = useState<string>(
    product?.description || ""
  );
  const [categoryId, setCategoryId] = useState<number>(
    product?.id || categories[0].id
  );
  const [images, setImages] = useState<string[]>(product?.images || [""]);

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
    setCategoryId(Number(e.target.value));
  };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imagesArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages(imagesArray);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        title,
        price,
        description,
        category: categories.find((c) => c.id === categoryId),
      };

      if (product.creationAt) {
        await axios.put(
          `https://api.escuelajs.co/api/v1/products/${product.id}`,
          data
        );
        dispatch(fetchProductById(product.id.toString()));
      } else {
        await axios.post("https://api.escuelajs.co/api/v1/products", data);
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
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {product ? "Update Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold"
            >
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
            <label
              htmlFor="price"
              className="block text-gray-700 font-semibold"
            >
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
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-gray-700 font-semibold"
            >
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImagesChange}
              className="mt-1 px-4 py-2 block w-full border rounded-md"
            />
          </div>
          <div className="mb-4 flex">
            {images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
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
    </div>
  );
};

export default ProductForm;