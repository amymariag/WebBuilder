import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const componentsList = ["💖 Button", "🌸 Text Box", "🎀 Image", "✨ Section"];

const App = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/load").then((res) => {
      setComponents(res.data.components);
    });
  }, []);

  const addComponent = (type) => {
    setComponents([...components, { type, id: Date.now() }]);
  };

  const saveDesign = () => {
    axios.post("http://localhost:5000/save", { components }).then(() => {
      alert("Design saved! 🎀✨");
    });
  };

  return (
    <div className="container">
      <h1 className="title">💖 Drag & Drop Website Builder ✨</h1>
      <div className="toolbar">
        {componentsList.map((comp) => (
          <button key={comp} onClick={() => addComponent(comp)}>{comp}</button>
        ))}
      </div>
      <div className="canvas">
        {components.map((comp) => (
          <div key={comp.id} className="component">{comp.type}</div>
        ))}
      </div>
      <button className="save-btn" onClick={saveDesign}>💾 Save Design</button>
    </div>
  );
};

export default App;
