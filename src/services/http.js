import db from "../../appWrite/databases";
import { Query } from "appwrite";

async function fetchHttp() {
  const response = await db.pizzas.list([Query.equal("visible", [true])]);
  const restDate = await response.documents;

  if (!restDate) {
    throw new Error("Failed to fetch pizza");
  }
  return restDate;
}
export function fetchMeals() {
  const data = fetchHttp();
  return data;
}
export async function fetchOrder({ items, customer, totalPrice }) {
  const itemsArray = items.map((item) => `${item.$id}:${item.quantity}`);

  const orderData = {
    name: customer.name,
    phone: customer.phone,
    address: customer.adresse,
    delivery: customer.delivery === "oui",
    notes: customer.notes,
    total: totalPrice,
    createdAt: new Date().toISOString(),
    items: itemsArray,
    status: "enAttente",
  };
  //console.log(orderData);

  try {
    const response = await db.orders.create(orderData);
    if (!response) {
      throw new Error("Failed to create order");
    }
  } catch (error) {
    return { message: error.message };
  }
}
export async function fetchOrders({ page = 1, limit = 20 }) {
  try {
    const offset = (page - 1) * limit;

    const response = await db.orders.list([
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc("createdAt"),
    ]);

    return {
      orders: response.documents,
      total: response.total,
    };
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw new Error("Impossible de récupérer les commandes.");
  }
}
