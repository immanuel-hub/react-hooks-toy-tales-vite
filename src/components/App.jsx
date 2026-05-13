import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API = "http://localhost:3001/toys";

// Root component: owns all toy state and CRUD handlers
function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET all toys on mount
  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setToys);
  }, []);

  // POST a new toy
  function handleAddToy(toy) {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toy),
    })
      .then((r) => r.json())
      .then((newToy) => setToys((prev) => [...prev, newToy]));
  }

  // DELETE a toy
  function handleDonate(id) {
    fetch(`${API}/${id}`, { method: "DELETE" }).then(() =>
      setToys((prev) => prev.filter((t) => t.id !== id))
    );
  }

  // PATCH likes — update in place to preserve order
  function handleLike(id, currentLikes) {
    fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: currentLikes + 1 }),
    })
      .then((r) => r.json())
      .then((updated) =>
        setToys((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
      );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={() => setShowForm((s) => !s)}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDonate={handleDonate} onLike={handleLike} />
    </>
  );
}

export default App;
