import React, { useState, useEffect } from "react";
import "./App.css";

// Brand and palette constants
const BRAND_NAME = "Recipe Explorer";
const COLOR_PRIMARY = "#388e3c";
const COLOR_SECONDARY = "#fbc02d";
const COLOR_ACCENT = "#d32f2f";

// Some sample recipes (would be fetched from backend or API)
const SAMPLE_RECIPES = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    image: "https://source.unsplash.com/400x300/?spaghetti,pasta",
    summary: "A simple Italian pasta dish with creamy sauce and pancetta.",
    time: "25 min",
    ingredients: [
      "Spaghetti",
      "Eggs",
      "Parmesan cheese",
      "Pancetta",
      "Black pepper",
      "Salt"
    ],
    steps: [
      "Cook spaghetti al dente.",
      "Fry pancetta until crisp.",
      "Whisk eggs and Parmesan.",
      "Combine pasta, pancetta, and egg mixture off heat.",
      "Season and serve immediately."
    ]
  },
  {
    id: 2,
    title: "Grilled Lemon Herb Chicken",
    image: "https://source.unsplash.com/400x300/?grilled,chicken",
    summary: "Juicy grilled chicken breasts marinated with fresh herbs and lemon.",
    time: "40 min",
    ingredients: [
      "Chicken breast",
      "Lemon juice",
      "Olive oil",
      "Rosemary",
      "Garlic",
      "Salt",
      "Pepper"
    ],
    steps: [
      "Marinate chicken with herbs, lemon juice, and oil.",
      "Heat grill to medium-high.",
      "Grill chicken 6-7 min per side.",
      "Rest and slice before serving."
    ]
  },
  {
    id: 3,
    title: "Vegetarian Curry Bowl",
    image: "https://source.unsplash.com/400x300/?vegetarian,curry",
    summary: "Healthy bowl of fragrant veggies and curry sauce over rice.",
    time: "35 min",
    ingredients: [
      "Mixed vegetables",
      "Coconut milk",
      "Curry paste",
      "Basmati rice",
      "Cilantro"
    ],
    steps: [
      "Sauté vegetables.",
      "Add curry paste and coconut milk.",
      "Simmer until veggies tender.",
      "Serve curry over cooked rice, garnish with cilantro."
    ]
  }
];

// PUBLIC_INTERFACE
function App() {
  // Recipe state and search
  const [recipes, setRecipes] = useState(SAMPLE_RECIPES);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(SAMPLE_RECIPES);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // PUBLIC_INTERFACE - Search filtering effect
  useEffect(() => {
    const val = search.toLowerCase();
    setFiltered(
      recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(val) ||
          r.summary.toLowerCase().includes(val)
      )
    );
  }, [search, recipes]);

  // PUBLIC_INTERFACE - Recipe click handler
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // PUBLIC_INTERFACE - Recipe modal close
  const closeModal = () => setSelectedRecipe(null);

  // PUBLIC_INTERFACE - Navbar component
  const Navbar = (
    <nav className="navbar" style={{
      background: "#fff",
      borderBottom: `1px solid #eaeaea`,
      padding: "0.8rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      minHeight: "58px"
    }}>
      <div className="brand" style={{
        fontWeight: "bold",
        color: COLOR_PRIMARY,
        fontSize: "1.4rem",
        letterSpacing: "0.5px"
      }}>{BRAND_NAME}</div>
      <input
        className="search"
        style={{
          border: `1px solid #e0e0e0`,
          borderRadius: 24,
          padding: "9px 18px",
          fontSize: 16,
          background: "#fafafa",
          minWidth: 170,
          width: "35vw",
          maxWidth: 350,
          marginLeft: 26,
          color: "#222",
          outline: "none"
        }}
        type="text"
        placeholder="Search recipes…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search recipes"
      />
    </nav>
  );

  // PUBLIC_INTERFACE - Recipe grid card
  const RecipeGrid = (
    <section
      className="recipe-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
        gap: "2rem",
        padding: "2.2rem 2vw 3.8rem 2vw",
        boxSizing: "border-box",
        maxWidth: 1200,
        margin: "0 auto",
        minHeight: 300
      }}>
      {filtered.length === 0 ? (
        <div style={{
          gridColumn: "1/-1",
          color: "#aaa",
          letterSpacing: "0.2px",
          marginTop: 28,
          fontSize: "1.1rem"
        }}>No recipes found.</div>
      ) : (filtered.map((r) => (
        <div
          key={r.id}
          className="recipe-card"
          style={{
            background: "#fff",
            border: `1px solid #eaeaea`,
            borderRadius: 18,
            boxShadow: "0 3px 16px 0 rgba(56, 142, 60, 0.045)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            transition: "transform .13s cubic-bezier(.4,0,.6,1), box-shadow .2s",
            minHeight: 320,
            willChange: "transform"
          }}
          onClick={() => handleRecipeClick(r)}
          tabIndex={0}
          aria-label={`View details for ${r.title}`}
        >
          <img
            src={r.image}
            alt={r.title}
            style={{
              width: "100%",
              height: 160,
              objectFit: "cover",
              background: "#e0e0e0"
            }}
            loading="lazy"
          />
          <div style={{ padding: "1rem 1.3rem 0.7rem 1.3rem", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{
              fontWeight: 600,
              fontSize: "1.05rem",
              margin: "0 0 0.5em 0",
              color: COLOR_PRIMARY,
              lineHeight: "1.18"
            }}>{r.title}</div>
            <div style={{
              fontSize: 15,
              color: "#6d6d6d",
              marginBottom: 6,
              flex: 1
            }}>{r.summary}</div>
            <div style={{
              display: "flex",
              alignItems: "center",
              marginTop: "auto",
              fontSize: 13
            }}>
              <span style={{
                background: COLOR_PRIMARY,
                color: "#fff",
                borderRadius: 9,
                padding: "2px 9px",
                fontWeight: 500,
                marginRight: 8
              }}>{r.time}</span>
              <span style={{ color: "#aaa" }}>{r.ingredients.length} ingredients</span>
            </div>
          </div>
        </div>
      )))
      }
    </section>
  );

  // PUBLIC_INTERFACE - Recipe details modal
  const RecipeModal = selectedRecipe && (
    <div
      className="modal-overlay"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      onClick={closeModal}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(28,28,28,0.37)",
        zIndex: 2200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <div
        className="modal-card"
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 10px 46px 4px rgba(56,142,60,0.09)",
          maxWidth: 480,
          width: "88vw",
          maxHeight: "84vh",
          overflowY: "auto",
          padding: "2.2rem 2.2rem 1.4rem 2.2rem",
          position: "relative"
        }}>
        <button
          className="modal-close"
          aria-label="Close details"
          onClick={closeModal}
          style={{
            position: "absolute",
            top: 16, right: 16,
            border: "none",
            background: COLOR_ACCENT,
            color: "#fff",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            cursor: "pointer",
            boxShadow: "0 3px 12px 0 rgba(189,24,24,.13)"
          }}
        >✕</button>
        <div style={{
          fontWeight: 700,
          color: COLOR_PRIMARY,
          fontSize: "1.3rem",
          marginBottom: 8,
          letterSpacing: "0.2px"
        }}>{selectedRecipe.title}</div>
        <img
          src={selectedRecipe.image}
          alt={selectedRecipe.title}
          style={{
            borderRadius: 12,
            width: "100%",
            objectFit: "cover",
            marginBottom: 16,
            height: 180,
            background: "#f4f4f4"
          }}
          loading="lazy"
        />
        <div style={{ color: "#666", marginBottom: 13, fontSize: 15 }}>{selectedRecipe.summary}</div>
        <div style={{ marginBottom: 9, fontSize: 14 }}>
          <span style={{
            background: COLOR_SECONDARY,
            color: "#333",
            borderRadius: 6,
            padding: "2px 8px",
            fontWeight: 500,
            marginRight: 7
          }}>{selectedRecipe.time}</span>
        </div>
        <div style={{ fontWeight: 600, fontSize: "1.08rem", color: COLOR_PRIMARY, margin: "0.7rem 0 0.18rem 0" }}>Ingredients:</div>
        <ul style={{ margin: 0, padding: "0 0 0 1.1em", color: "#444" }}>
          {selectedRecipe.ingredients.map((ing, i) =>
            <li key={i} style={{ fontSize: 14, marginBottom: 3 }}>{ing}</li>
          )}
        </ul>
        <div style={{ fontWeight: 600, fontSize: "1.06rem", color: COLOR_PRIMARY, margin: "0.8rem 0 0.15rem 0" }}>Steps:</div>
        <ol style={{ margin: 0, padding: "0 0 0 1.2em", color: "#474747", fontSize: 14 }}>
          {selectedRecipe.steps.map((s, i) =>
            <li key={i} style={{ marginBottom: 3 }}>{s}</li>
          )}
        </ol>
      </div>
    </div>
  );

  // PUBLIC_INTERFACE - Footer
  const Footer = (
    <footer
      className="footer"
      style={{
        width: "100%",
        padding: "1.3rem 0",
        background: COLOR_PRIMARY,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        letterSpacing: "0.1px",
        marginTop: "auto"
      }}>
      <span>
        © {new Date().getFullYear()} Recipe Explorer &middot; Built with <span style={{ color: COLOR_ACCENT }}>❤</span>
      </span>
    </footer>
  );

  // Final layout
  return (
    <div className="App" style={{ background: "#fcfcfc", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {Navbar}
      <main style={{ flex: 1 }}>{RecipeGrid}</main>
      {Footer}
      {RecipeModal}
    </div>
  );
}

export default App;
