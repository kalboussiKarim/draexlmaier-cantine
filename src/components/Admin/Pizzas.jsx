import React, { useEffect, useState } from "react";
import db from "../../../appWrite/databases";
import st from "../../../appWrite/storage";
import "./Pizzas.css";
import pizzaFallback from "../../assets/imageNonDisponible.jpg";

export default function Pizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [isSaving, setIsSaving] = useState({});
  const [uploading, setUploading] = useState({});
  const [newPizza, setNewPizza] = useState(null);

  useEffect(() => {
    async function loadPizzas() {
      try {
        const res = await db.pizzas.list();
        setPizzas(
          res.documents.map((p) => ({ ...p, visible: p.visible ?? true }))
        );
      } catch (err) {
        console.error("Erreur lors du chargement des pizzas", err);
      }
    }

    loadPizzas();
  }, []);

  const handleChange = (id, field, value) => {
    setPizzas((prev) =>
      prev.map((pizza) =>
        pizza.$id === id ? { ...pizza, [field]: value } : pizza
      )
    );
  };

  const handleSave = async (id) => {
    setIsSaving((prev) => ({ ...prev, [id]: true }));
    const pizza = pizzas.find((p) => p.$id === id);
    try {
      await db.pizzas.update(id, {
        name: pizza.name,
        description: pizza.description,
        ingredients: pizza.ingredients,
        price: parseFloat(pizza.price),
        imageURL: pizza.imageURL,
        visible: pizza.visible,
      });
    } catch (err) {
      console.error("Erreur mise à jour :", err);
      alert("Échec de la mise à jour.");
    } finally {
      setIsSaving((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleImageUpload = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [id]: true }));

    try {
      const uploaded = await st.images.upload(file);
      const imageId = uploaded.$id;

      setPizzas((prev) =>
        prev.map((pizza) =>
          pizza.$id === id ? { ...pizza, imageURL: imageId } : pizza
        )
      );
    } catch (err) {
      console.error("Erreur upload image :", err);
      alert("Échec de l’upload de l’image.");
    } finally {
      setUploading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleImageDelete = async (id) => {
    const pizza = pizzas.find((p) => p.$id === id);
    if (!pizza || !pizza.imageURL) return;

    try {
      await st.images.delete(pizza.imageURL); // delete from storage
      await db.pizzas.update(id, { imageURL: "" }); // update DB

      // update local state
      setPizzas((prev) =>
        prev.map((p) => (p.$id === id ? { ...p, imageURL: "" } : p))
      );
    } catch (err) {
      console.error("Erreur suppression image :", err);
      alert("Échec de la suppression de l’image.");
    }
  };

  return (
    <div className="pizzas-container">
      <h2>🍕 Gestion des Pizzas</h2>
      <button
        className="button"
        style={{ marginBottom: "1rem" }}
        onClick={() =>
          setNewPizza({
            name: "",
            price: "",
            ingredients: "",
            description: "",
            imageURL: "",
            visible: true,
          })
        }
      >
        ➕ Créer une nouvelle pizza
      </button>
      {newPizza && (
        <div className="pizza-card" style={{ backgroundColor: "#00356aff" }}>
          <div className="pizza-left">
            <img
              src={
                newPizza.imageURL
                  ? st.images.getFileView(newPizza.imageURL)
                  : pizzaFallback
              }
              alt="Nouvelle pizza"
              className="pizza-image"
            />
          </div>
          <div className="pizza-right">
            <label>
              Nom :
              <input
                type="text"
                value={newPizza.name}
                onChange={(e) =>
                  setNewPizza({ ...newPizza, name: e.target.value })
                }
              />
            </label>
            <label>
              Prix :
              <input
                type="number"
                value={newPizza.price}
                onChange={(e) =>
                  setNewPizza({ ...newPizza, price: e.target.value })
                }
              />
            </label>
            <label>
              Ingrédients :
              <input
                type="text"
                value={newPizza.ingredients}
                onChange={(e) =>
                  setNewPizza({ ...newPizza, ingredients: e.target.value })
                }
              />
            </label>
            <label>
              Description :
              <textarea
                value={newPizza.description}
                onChange={(e) =>
                  setNewPizza({ ...newPizza, description: e.target.value })
                }
              />
            </label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <label style={{ fontSize: "0.95rem" }}>Pizza visible ?</label>
              <input
                type="checkbox"
                checked={newPizza.visible}
                onChange={(e) =>
                  setNewPizza({ ...newPizza, visible: e.target.checked })
                }
              />
            </div>

            <label>
              Image :
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  try {
                    const uploaded = await st.images.upload(file);
                    setNewPizza({ ...newPizza, imageURL: uploaded.$id });
                  } catch (err) {
                    console.error("Erreur upload image :", err);
                    alert("Échec de l’upload de l’image.");
                  }
                }}
              />
            </label>

            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <button
                onClick={async () => {
                  try {
                    const newDoc = await db.pizzas.create({
                      ...newPizza,
                      price: parseFloat(newPizza.price),
                    });
                    setPizzas((prev) => [...prev, newDoc]);
                    setNewPizza(null); // Reset form
                  } catch (err) {
                    console.error("Erreur création pizza :", err);
                    alert("Échec de la création.");
                  }
                }}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "0.5rem",
                }}
              >
                ✅ Ajouter
              </button>
              <button
                onClick={() => setNewPizza(null)}
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  padding: "0.5rem",
                }}
              >
                ❌ Annuler
              </button>
            </div>
          </div>
        </div>
      )}
      {pizzas.map((pizza) => (
        <div key={pizza.$id} className="pizza-card">
          <div className="pizza-left">
            <img
              src={
                pizza.imageURL
                  ? st.images.getFileView(pizza.imageURL)
                  : pizzaFallback
              }
              alt={pizza.name}
              className="pizza-image"
            />
            {pizza.imageURL && (
              <button
                onClick={() => handleImageDelete(pizza.$id)}
                className="delete-img-btn"
              >
                🗑️ Supprimer l'image
              </button>
            )}
          </div>

          <div className="pizza-right">
            <label>
              Nom :
              <input
                type="text"
                value={pizza.name}
                onChange={(e) =>
                  handleChange(pizza.$id, "name", e.target.value)
                }
              />
            </label>
            <label>
              Prix :
              <input
                type="number"
                value={pizza.price}
                onChange={(e) =>
                  handleChange(pizza.$id, "price", e.target.value)
                }
              />
            </label>
            <label>
              Ingrédients :
              <input
                type="text"
                value={pizza.ingredients}
                onChange={(e) =>
                  handleChange(pizza.$id, "ingredients", e.target.value)
                }
              />
            </label>
            <label>
              Description :
              <textarea
                value={pizza.description}
                onChange={(e) =>
                  handleChange(pizza.$id, "description", e.target.value)
                }
              />
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <label
                htmlFor="visible"
                style={{
                  fontSize: "0.95rem",
                  cursor: "pointer",
                }}
              >
                Pizza visible ?
              </label>
              <input
                type="checkbox"
                checked={pizza.visible}
                onChange={(e) =>
                  handleChange(pizza.$id, "visible", e.target.checked)
                }
                style={{ cursor: "pointer" }}
              />
            </div>

            <label>
              Image :
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, pizza.$id)}
              />
            </label>
            <button
              onClick={() => handleSave(pizza.$id)}
              disabled={isSaving[pizza.$id]}
              style={{
                backgroundColor: "rgb(11, 135, 0)",

                marginTop: "10px",
              }}
            >
              {isSaving[pizza.$id] ? "Sauvegarde..." : "💾 Sauvegarder"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
