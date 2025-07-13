import React from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchMeals } from "../services/http";
import Error from "./Error";
import MealItem from "./MealItem";
import Footer from "./Footer";

export default function Meals() {
  const { isFetching, fetchedData, error } = useFetch(fetchMeals, []);

  if (isFetching) {
    return (
      <div className="centered-message">
        <div className="spinner"></div>
        <p>Chargement du menu ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered-message">
        <p>échec lors du chargement du menu ...</p>
      </div>
    );
  }

  if (fetchedData.length === 0) {
    return (
      <div className="centered-message">
        <p>Menu non trouvé.</p>
      </div>
    );
  }
  return (
    <>
      <section className="hero">
        <div className="hero-overlay">
          <h1>Pizzeria Pajoo</h1>
          <p>Pizzas au feu de bois authentique</p>
          <p>
            Découvrez nos pizzas artisanales cuites au four à bois traditionnel
            avec des ingrédients frais et de qualité, au cœur de Msaken.
          </p>
          <a href="#meals-title">
            <button className="button">Découvrir nos pizzas</button>
          </a>
        </div>
      </section>
      <h2 id="meals-title">Nos Spécialités</h2>
      <ul id="meals">
        {fetchedData.map((meal) => (
          <li key={meal.$id}>
            <MealItem meal={meal} />
          </li>
        ))}
      </ul>
      {/* Wood Fired Section */}
      <section className="woodfire-section">
        <div className="woodfire-content">
          <div className="woodfire-image">
            <img src="./woodFired.jpg" alt="Pizza au feu de bois" />
          </div>
          <div className="woodfire-text">
            <h2>L'Art du Feu de Bois</h2>
            <p>
              Située au cœur de Msaken, Pizzeria Pajoo vous propose
              l'authentique expérience de la pizza cuite au feu de bois. Notre
              four traditionnel en briques, chauffé exclusivement au bois,
              atteint des températures de plus de 400°C pour une cuisson
              parfaite.
            </p>
            <p>
              Cette méthode ancestrale donne à nos pizzas cette saveur fumée
              unique et cette pâte croustillante à l'extérieur, moelleuse à
              l'intérieur. Le feu de bois apporte une dimension gustative
              incomparable que ne peuvent égaler les fours électriques.
            </p>
            <p>
              Chaque pizza est une œuvre d'art culinaire, façonnée à la main et
              cuite avec la passion du vrai savoir-faire italien, dans
              l'atmosphère chaleureuse de Msaken.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contactez-nous</h2>
        <div className="contact-content">
          <div className="contact-item">
            <h3>📞 Téléphone</h3>
            <p>+216 55 123 456</p>
          </div>
          <div className="contact-item">
            <h3>📍 Adresse</h3>
            <p>Bd Dr Taieb Hachicha, Msaken 4070, Tunisie</p>
          </div>
          <div className="contact-item">
            <h3>🕒 Horaires</h3>
            <p>
              Ouvert tous les jours
              <br />
              17h00 - 03h00
            </p>
          </div>
        </div>
      </section>
      {/* Google Mapppppppppps */}
      <section className="map-section">
        <h2>Où nous trouver</h2>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps?q=35.74000,10.58401&z=16&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
