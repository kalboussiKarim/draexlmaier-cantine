import { useEffect, useState } from "react";

export const useFetch = (fetchFn, initialValue) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  async function fetchData() {
    setIsFetching(true);
    try {
      const data = await fetchFn();
      setFetchedData(data);
    } catch (error) {
      setError(error.message || "fail to fetch data .");
    }
    setIsFetching(false);
  }
  useEffect(() => {
    fetchData();
  }, [fetchFn]);
  return {
    isFetching,
    fetchedData,
    error,
    fetchData,
  };
};
