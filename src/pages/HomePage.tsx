import Benefits from "../components/Benefits/Benefits";
import Category from "../components/Category";
import Product from "../components/Product";
import Slider from "../components/Slider";

const HomePage = () => {
  return (
    <div className="product-list">
      <Slider />
      <Benefits />
      <Product />
      <Category />
    </div>
  );
};

export default HomePage;
