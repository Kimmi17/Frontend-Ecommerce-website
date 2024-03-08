import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cartProducts = useSelector((state: RootState) => state.cart.products);

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
              <TableHead className="">Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Sum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell className="text-right">
                  $ {p.price * p.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CartPage;
