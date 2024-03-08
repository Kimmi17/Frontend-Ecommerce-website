import React from "react";
import { MdDiscount, MdSupportAgent } from "react-icons/md";
import { ImTruck } from "react-icons/im";
import { SiMoneygram } from "react-icons/si";
import BenefitCard from "./BenefitCard";

const Benefits = () => {
  const data = [
    {
      icon: <ImTruck className="text-4l" />,
      title: "Free Delivery",
      description:
        "Enjoy complimentary delivery on all orders. Our customer support is available 24/7 to assist you.",
    },

    {
      icon: <MdSupportAgent className="text-4l" />,
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is available round the clock to assist you with any queries or concerns you may have.",
    },
    {
      icon: <MdDiscount className="text-4l" />,
      title: "Discounts Available",
      description:
        "Take advantage of our ongoing discounts and special offers to save on your purchases.",
    },
    {
      icon: <SiMoneygram className="text-4l" />,
      title: "Easy Returns and Refunds",
      description:
        "If you are not satisfied with your purchase, we offer hassle-free returns and refunds to ensure your complete satisfaction.",
    },
  ];

  return (
    <div className="container grid gap-1 sm:grid-col-2 lg:grid-cols-4 mt-8">
      {data.map((item) => (
        <BenefitCard
          key={item.title}
          icon={item.icon}
          description={item.description}
          title={item.title}
        />
      ))}
    </div>
  );
};

export default Benefits;
