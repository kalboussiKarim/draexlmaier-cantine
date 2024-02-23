async function fetchHttp(url, options = {}) {
  const response = await fetch(`http://localhost:3000/${url}`, options);
  const restDate = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return restDate;
}
export function fetchMeals() {
  const data = fetchHttp("meals");
  return data;
}
export async function fetchOrder({ items, customer }) {
  try {
    const data = fetchHttp("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: items,
          customer: customer,
        },
      }),
    });
    return data;
  } catch (error) {
    return { message: error.message };
  }
}
