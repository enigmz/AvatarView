import React from 'react';
import BabylonScene from './components/3DViewComponent.tsx';
import './App.css';

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <BabylonScene />
    </div>
  );
}

export default App;
