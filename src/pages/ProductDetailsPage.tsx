import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import store, { RootState } from "../redux/store";
import { fetchProductById } from "../redux/slices/productSlice";
import { useSelector } from "react-redux";
import cartSlice from "../redux/slices/cartSlice";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/use-toast";

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
      await axios.put(`http://localhost:8080/api/v1/products/${id}`, {
        title,
        price,
      });

      console.log("Product updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedProduct) {
    return <div>Product not found !!!</div>;
  }

  const addProductToCart = () => {
    if (id) {
      store.dispatch(cartSlice.actions.addProductsToCart(id));
      toast({
        title: "Added to cart",
        description: `${selectedProduct.title} has been added to your cart`,
        duration: 3000,
      });
    }
  };

  return (
    <>
      {selectedProduct && (
        <div
          className="bg-gray-100 min-h-screen flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/7123111/pexels-photo-7123111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        >
          <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl">
            <h2 className="text-3xl font-semibold mb-4">
              {selectedProduct.title}
            </h2>
            <div className="flex flex-wrap justify-between mb-4">
              <div className="w-full md:w-1/2 mb-4 md:mb-0 flex flex-wrap">
                {selectedProduct.image.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={selectedProduct.title}
                    className="w-1/2 h-auto rounded-xl"
                  />
                ))}
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-lg text-gray-700 font-semibold mb-2">
                  Price: ${selectedProduct.price}
                </p>
                <p className="text-gray-700 mb-4">
                  {selectedProduct.description}
                </p>
                <p className="text-gray-700 font-semibold mt-2 mb-2">
                  Category: {selectedProduct.categoryId.name}
                </p>
                <div className="text-gray-700 text-sm">
                  {!isAdmin && (
                    <Button
                      onClick={addProductToCart}
                      className="bg-blue-600 hover:bg-blue-200 text-white font-bold py-2 px-4 mt-2 rounded"
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
