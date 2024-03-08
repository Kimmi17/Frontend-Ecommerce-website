import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-gradient-to-r from-c5eff7 to-96d6e0 py-8 px-8 text-center bottom-0 w-full"
      style={{
        background: "linear-gradient(to right, #c5eff7, #96d6e0)",
        marginTop: "20px",
      }}
    >
      <p className="text-black font-serif font-bold">
        &copy; 2024 Dang Thuy. All rights reserved. Photo from Vascara's
        collection
      </p>
    </footer>
  );
};

export default Footer;
