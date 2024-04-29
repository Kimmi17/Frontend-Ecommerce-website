import React, { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import { Button } from "../components/ui/button";
import {} from "../redux/slices/productSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { getAllUsers } from "../redux/slices/userSlice";

const UsersPage = () => {
  const dispatch = store.dispatch;

  const usersList = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(usersList.toString());
  return (
    <div>
      <div className="mx-4 mt-8">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Full name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersList.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p._id}</TableCell>
                <TableCell>{`${p.firstname} ${p.lastname}`}</TableCell>
                <TableCell>{p.role}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.banStatus ? "Banned" : "Active"}</TableCell>

                <TableCell>
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
                          Do you really want to delete the selected user ?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild></DialogClose>
                        <DialogClose asChild>
                          <Button className="mr-2 bg-red-500 hover:bg-red-600 text-white rounded">
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

export default UsersPage;
