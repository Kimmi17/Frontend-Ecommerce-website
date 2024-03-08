import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { RootState } from "../redux/store";
import {
  addProductsToCart,
  removeProductsToCart,
} from "../redux/slices/cartSlice";
import { Product } from "../miscs/types/types";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  const [toastMessage, setToastMessage] = useState<string>("");

  const handleRemove = (productId: number) => {
    dispatch(removeProductsToCart(productId));
  };

  const handleIncrease = (p: Product) => {
    dispatch(addProductsToCart(p));
  };

  const handleDecrease = (productId: number) => {
    dispatch(removeProductsToCart(productId));
  };

  const handleCheckout = () => {
    setToastMessage("You need to log in to check out."); // Setting the toast message
    setTimeout(() => {
      setToastMessage(""); // Clearing the toast message after a certain time
    }, 3000); // Adjust the duration as needed
  };

  return (
    <div className="flex justify-center">
      <div className="w-[80%]">
        <Table>
          <TableCaption>
            TOTAL : ${" "}
            {cartProducts.length > 0
              ? cartProducts.reduce((acc, p) => acc + p.price * p.quantity, 0)
              : 0}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Sum</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell>$ {p.price * p.quantity}</TableCell>
                <TableCell>
                  <Button
                    className="mr-2 bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleRemove(p.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    className="mr-2 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleIncrease(p)}
                  >
                    +
                  </Button>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => handleDecrease(p.id)}
                  >
                    -
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
        {toastMessage && (
          <div className="toast">
            <p>{toastMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
