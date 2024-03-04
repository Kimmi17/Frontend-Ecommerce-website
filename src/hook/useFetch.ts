import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../miscs/types";

const useFetch = (url: string) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("An error occurred while fetching data.");
          setLoading(false);
        });
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
