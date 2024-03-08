import React from "react";
import { BenefitCardProps } from "../../miscs/types/types";

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex gap-2 bg-gray-100 px-4 py-6">
      <div style={{ fontSize: "24px" }}>{icon}</div>
      <div>
        <h2 className="font-medium text-1">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
