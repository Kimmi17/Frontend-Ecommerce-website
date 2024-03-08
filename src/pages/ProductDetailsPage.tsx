import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import store, { RootState } from "../redux/store";
import { fetchProductById } from "../redux/slices/productSlice";
import { useSelector } from "react-redux";
import cartSlice from "../redux/slices/cartSlice";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import ProductForm from "../components/ProductForm";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/use-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

interface UpdateProductProps {
  productId: number;
}

const ProductsDetailPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = store.dispatch;
  const user = store.getState().user.currentUser;
  const isAdmin = user?.role === "admin";

  const selectedProduct = useSelector(
    (state: RootState) => state.products.selectedProduct
  );

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, {
        title,
        price,
      });

      // Assuming successful update, you can redirect or perform any other action
      console.log("Product updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedProduct) {
    return <div>Product not found !!!</div>;
  }

  const addProductToCart = () => {
    store.dispatch(cartSlice.actions.addProductsToCart(selectedProduct));
    toast({
      title: "Added to cart",
      description: `${selectedProduct.title} has been added to your cart`,
      duration: 3000,
    });
  };

  return (
    <>
      {selectedProduct && (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl">
            <h2 className="text-3xl font-semibold mb-4">
              {selectedProduct.title}
            </h2>
            <div className="flex flex-wrap justify-between mb-4">
              <div className="w-full md:w-1/2 mb-4 md:mb-0 flex flex-wrap">
                {selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={selectedProduct.title}
                    className="w-1/2 h-auto rounded-lg"
                  />
                ))}
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-lg font-semibold mb-2">
                  Price: ${selectedProduct.price}
                </p>
                <p className="text-gray-600 mb-4">
                  {selectedProduct.description}
                </p>
                <p className="text-gray-700">
                  Category: {selectedProduct.category.name}
                </p>
                <div className="text-gray-600 text-sm">
                  <p>
                    Created at:{" "}
                    {new Date(selectedProduct.creationAt).toLocaleString()}
                  </p>
                  <p>
                    Updated at:{" "}
                    {new Date(selectedProduct.updatedAt).toLocaleString()}
                  </p>
                  {isAdmin ? (
                    <Dialog>
                      <DialogTrigger>
                        <Button>
                          Edit Product <Pencil2Icon className="mx-2 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                          <DialogDescription>
                            <ProductForm product={selectedProduct} />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button
                      onClick={addProductToCart}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Add to cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsDetailPage;
