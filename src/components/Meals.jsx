import React from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchMeals } from "../services/http";
export default function Meals() {
  const { isFetching, fetchedData, error } = useFetch(fetchMeals, []);
  return <ul id="meals">
    {fetchedData.map((meal)=>(
        <li key={meal.id}>{meal.name}</li>
    ))}
  </ul>;
}
