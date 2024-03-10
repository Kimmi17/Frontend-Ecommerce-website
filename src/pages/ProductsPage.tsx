import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import { Button } from "../components/ui/button";
import {
  deleteProductById,
  fetchAllProductsForAdmin,
  searchProductsByTitle,
} from "../redux/slices/productSlice";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import ProductForm from "../components/ProductForm";

const ProductsPage = () => {
  const dispatch = store.dispatch;
  const [keyword, setkeyword] = useState("");

  const productsForAdmin = useSelector(
    (state: RootState) => state.products.productsForAdmin
  );

  useEffect(() => {
    dispatch(fetchAllProductsForAdmin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchProductsByTitle(keyword));
  }, [dispatch, keyword]);

  const handleDeleteProduct = async (id: number) => {
    await dispatch(deleteProductById(id));
    dispatch(searchProductsByTitle(keyword));
  };

  const submitCb = () => {
    dispatch(searchProductsByTitle(keyword));
  };
  return (
    <div>
      <div className="flex pr-2 py-2 gap-4 justify-end dark:bg-slate-800">
        <Input
          type="text"
          placeholder="Search product by title"
          onChange={(e) => setkeyword(e.target.value)}
          className="rounded max-w-[200px] md:max-w-[320px] dark:bg-gray-200"
        />

        <Dialog>
          <DialogTrigger asChild>
            <div className="inline">
              <Button className="mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                Add new product
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <ProductForm submitCb={submitCb} modalMode="CREATE" />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-4 mt-8">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:flex">Pictures</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsForAdmin.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell className="hidden gap-2 md:flex">
                  {p.images.map((i) => (
                    <img
                      key={i}
                      src={i.replace(/^\["|"\]$/g, "")}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "https://via.placeholder.com/300";
                      }}
                      className="w-[60px] rounded"
                      alt="product_image"
                    />
                  ))}
                </TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="inline">
                        <Button className="mr-2 rounded" variant={"outline"}>
                          Edit
                        </Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogDescription>
                          <ProductForm product={p} submitCb={submitCb} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="mr-2 bg-red-500 hover:bg-red-600 text-white rounded"
                        // onClick={() => handleIncrease(p)}
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                      <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                          Do you really want to delete the selected product ?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            className="mr-2 bg-red-500 hover:bg-red-600 text-white rounded"
                            onClick={() => handleDeleteProduct(p.id)}
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsPage;
