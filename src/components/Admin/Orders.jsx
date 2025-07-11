import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../services/http";
import db from "../../../appWrite/databases";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [pizzasMap, setPizzasMap] = useState({});
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const ORDERS_PER_PAGE = 20;

  useEffect(() => {
    async function loadPizzas() {
      try {
        const res = await db.pizzas.list();
        const map = {};
        res.documents.forEach((pizza) => {
          map[pizza.$id] = pizza.name;
        });
        setPizzasMap(map);
      } catch (err) {
        console.error("Failed to load pizzas", err);
      }
    }

    loadPizzas();
  }, []);

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true);
      setError(null);
      try {
        const { orders, total } = await fetchOrders({
          page,
          limit: ORDERS_PER_PAGE,
        });
        setOrders(orders);
        setTotalOrders(total);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, [page]);

  function ConfirmDialog({ message, onConfirm, onCancel }) {
    return (
      <div className="confirm-overlay">
        <div className="confirm-box">
          <p>{message}</p>
          <div className="confirm-actions">
            <button className="confirm-btn" onClick={onConfirm}>
              Oui
            </button>
            <button className="cancel-btn" onClick={onCancel}>
              Annuler
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);

  const handleDeleteOrder = async () => {
    try {
      await db.orders.delete(orderToDelete);
      setOrders((prev) => prev.filter((order) => order.$id !== orderToDelete));
    } catch (err) {
      console.error("Erreur lors de la suppression de la commande :", err);
      alert("Échec de la suppression de la commande.");
    } finally {
      setShowConfirm(false);
      setOrderToDelete(null);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await db.orders.update(orderId, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.$id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      alert("Échec de la mise à jour du statut de la commande.");
    }
  };

  return (
    <div className="orders-container">
      <h2>📦 Liste des Commandes</h2>

      {isLoading && <p>Chargement...</p>}
      {error && <p className="error">{error}</p>}

      {!isLoading && !error && orders.length === 0 && (
        <p>Aucune commande trouvée.</p>
      )}

      {!isLoading && !error && orders.length > 0 && (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Téléphone</th>
              <th>Livraison</th>
              <th>Adresse</th>

              <th>Date</th>

              <th>Articles</th>
              <th>Notes</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const items = order.items || [];
              return (
                <tr key={order.$id}>
                  <td data-label="Client :">{order.name}</td>
                  <td data-label="Téléphone :">
                    <a href={`tel:${order.phone}`} className="phone-link">
                      {order.phone}
                    </a>
                  </td>
                  <td data-label="Livraison :">
                    {order.delivery ? "Oui" : "Non"}
                  </td>
                  <td data-label="Adresse :">{order.address || "—"}</td>

                  <td data-label="Date :">
                    {new Date(order.createdAt).toLocaleString("fr-FR")}
                  </td>

                  <td data-label="Articles :">
                    <ul className="order-items-list">
                      {items.map((itemStr, index) => {
                        const [pizzaId, quantity] = itemStr.split(":");
                        return (
                          <li key={pizzaId + index}>
                            {quantity} x {pizzasMap[pizzaId] || pizzaId}
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td data-label="Notes :">{order.notes || "—"}</td>
                  <td data-label="Total :">{order.total} TND</td>
                  <td data-label="Statut :">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.$id, e.target.value)
                      }
                    >
                      <option value="enAttente">🕓 enAttente</option>
                      <option value="Confirmée">✅ Confirmée</option>
                      <option value="Livrée">📦 Livrée</option>
                    </select>
                  </td>
                  <td data-label="Supprimer :">
                    <button
                      className="delete-btn"
                      onClick={() => {
                        setOrderToDelete(order.$id);
                        setShowConfirm(true);
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => {
          const current = index + 1;
          return (
            <button
              key={current}
              onClick={() => setPage(current)}
              className={current === page ? "active" : ""}
            >
              {current}
            </button>
          );
        })}
      </div>
      {showConfirm && (
        <ConfirmDialog
          message="Supprimer cette commande ?"
          onConfirm={handleDeleteOrder}
          onCancel={() => {
            setShowConfirm(false);
            setOrderToDelete(null);
          }}
        />
      )}
    </div>
  );
}
