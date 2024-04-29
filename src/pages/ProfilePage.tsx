import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UserInfo from "../components/UserInfo";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <UserInfo user={currentUser} />
      <div className="mx-8">
        {currentUser.orders.map((o: any) => {
          return (
            <div className="shadow-lg rounded-lg p-6 mb-6">
              <div className="font-semibold text-lg mb-4">
                Order ID: {o._id}
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-medium mb-2">Products:</p>
                <ul>
                  {o.products.map((p: any, index: number) => (
                    <li
                      key={index}
                      className="text-sm"
                    >{`${p.productId} x ${p.quantity}`}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 font-medium mb-2">Total Price:</p>
                  <p className="text-lg font-semibold">${o.totalPrice}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium mb-2">
                    Payment Status:
                  </p>
                  <p className="text-lg font-semibold">{o.paymentStatus}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium mb-2">Order Date:</p>
                  <p className="text-lg font-semibold">
                    {new Date(o.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
