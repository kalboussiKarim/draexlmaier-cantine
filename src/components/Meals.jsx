import React from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchMeals } from "../services/http";
import Error from "./Error";
import MealItem from "./MealItem";
export default function Meals() {
  const { isFetching, fetchedData, error } = useFetch(fetchMeals, []);
  if (isFetching) {
    return <p className="center">Fetching meals ..... </p>;
  }
  if (error) {
    return <Error message={error} title="Failed to fetch meals .." />;
  }
  if (!fetchedData) {
    return <p className="center">No meals found </p>;
  }
  return (
    <ul id="meals">
      {fetchedData.map((meal) => (
        <li key={meal.id}>
          <MealItem meal={meal} />
        </li>
      ))}
    </ul>
  );
}
