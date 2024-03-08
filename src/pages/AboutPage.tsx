import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <img
          src="https://www.vascara.com/uploads/web/900/landing-page/tet-yeu/new/d/top-banner-1.jpg"
          alt="Slide 1"
          className="w-full rounded-lg shadow-lg transform transition-transform hover:scale-105"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-900">About Vascara</h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-700 leading-relaxed"
        >
          Vascara is not just a fashion brand; it's a journey of self-expression
          and confidence. Since our inception, we've been on a mission to
          redefine elegance and empower women to embrace their individuality.
          Our commitment to quality craftsmanship, timeless design, and
          sustainable practices has earned us a special place in the hearts of
          fashion enthusiasts.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-gray-700 leading-relaxed"
        >
          Expanding beyond the realms of fashion, Vascara's venture into selling
          electronics, bikes, and other products underscores its commitment to
          providing a holistic lifestyle experience to its customers. By
          diversifying its product offerings, Vascara demonstrates its
          versatility and adaptability in catering to the varied needs and
          interests of its clientele.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg text-gray-700 leading-relaxed"
        >
          Incorporating electronics into its product lineup, Vascara extends its
          reach into the realm of technology, offering customers access to
          cutting-edge gadgets and devices that seamlessly integrate into their
          daily lives. Whether it's the latest smartphones, tablets, laptops, or
          other electronic accessories, Vascara curates a selection of
          high-quality products that combine functionality with style.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-lg text-gray-700 leading-relaxed"
        >
          Furthermore, Vascara's inclusion of bikes reflects its dedication to
          promoting an active and sustainable lifestyle. By offering a range of
          bicycles, cycling gear, and accessories, Vascara encourages
          individuals to embrace eco-friendly modes of transportation, fostering
          a culture of health, wellness, and environmental consciousness.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default About;
