import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
import store, { RootState } from "../redux/store";
import {
  addProductsToCart,
  deleteProductsToCart,
  fetchProductsByIds,
  removeProductsToCart,
} from "../redux/slices/cartSlice";
import { Product } from "../miscs/types/types";
import { LogIn } from "lucide-react";
import { Navigate } from "react-router-dom";
import axios from "axios";

// const KEY = process.env.STRIPE_SECRET_KEY || "";

const CartPage: React.FC = () => {
  const dispatch = store.dispatch;
  const cartProducts = useSelector(
    (state: RootState) => state.cart.productData
  );

  const user = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState<string>("");

  const handleRemove = (productId: string) => {
    dispatch(deleteProductsToCart(productId));
  };

  const handleIncrease = (p: Product) => {
    dispatch(addProductsToCart(p._id));
  };

  const handleDecrease = (productId: string) => {
    dispatch(removeProductsToCart(productId));
  };

  const handleCheckout = async () => {
    // setToastMessage("You need to log in to check out."); // Setting the toast message
    // setTimeout(() => {
    //   setToastMessage(""); // Clearing the toast message after a certain time
    // }, 3000); // Adjust the duration as needed
    if (user) {
      // show Stripe form ==> /
      let accessToken = localStorage.getItem("accessToken");

      const makePayment = await axios.post(
        "http://localhost:8080/api/v1/payment",
        {
          receipt_email: user?.email,
          order: cartProducts,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const checkoutUrl = makePayment.data.url;
      window.location.href = checkoutUrl;
    } else {
      console.log(">>>");
      // Navigate to login page
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(fetchProductsByIds());
  }, [dispatch]);

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
              <TableRow key={p._id}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell>$ {p.price * p.quantity}</TableCell>
                <TableCell>
                  <Button
                    className="mr-2 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleIncrease(p)}
                  >
                    +
                  </Button>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => handleDecrease(p._id)}
                  >
                    -
                  </Button>
                  <Button
                    className="mr-2 bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleRemove(p._id)}
                  >
                    Remove
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
