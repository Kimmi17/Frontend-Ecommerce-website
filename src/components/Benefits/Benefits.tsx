import React from "react";
import { motion } from "framer-motion";
import { MdDiscount, MdSupportAgent } from "react-icons/md";
import { ImTruck } from "react-icons/im";
import { SiMoneygram } from "react-icons/si";
import BenefitCard from "./BenefitCard";

interface BenefitData {
  icon: JSX.Element;
  title: string;
  description: string;
}

const Benefits: React.FC = () => {
  const data: BenefitData[] = [
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
    <div className="container mt-8 flex justify-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        Our Promises to You
      </h2>
      <div className="grid gap-1 sm:grid-col-2 lg:grid-cols-4">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full flex justify-center" // Apply flexbox properties
          >
            <BenefitCard
              icon={item.icon}
              description={item.description}
              title={item.title}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
