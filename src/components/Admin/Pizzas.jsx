import React, { useEffect, useState } from "react";
import db from "../../../appWrite/databases";
import st from "../../../appWrite/storage";
import "./Pizzas.css";
import pizzaFallback from "../../assets/imageNonDisponible.jpg";

export default function Pizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [isSaving, setIsSaving] = useState({});
  const [uploading, setUploading] = useState({});

  useEffect(() => {
    async function loadPizzas() {
      try {
        const res = await db.pizzas.list();
        setPizzas(res.documents);
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
