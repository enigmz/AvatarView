import React, { useEffect, useRef } from "react";
import Viewer from "./../Engine/Viewer.tsx"; // Asegúrate de que esta ruta sea correcta

const ThreeDViewComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<Viewer | null>(null); // useRef para almacenar la instancia de Viewer

  useEffect(() => {
    if (canvasRef.current) {
      // Crear una nueva instancia de Viewer y almacenarla en viewerRef
      viewerRef.current = new Viewer(canvasRef.current);
    }

    return () => {
      // Limpiar la instancia de Viewer al desmontar el componente
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
    };
  }, []); // Dependencias vacías: el efecto se ejecuta solo al montar/desmontar

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ThreeDViewComponent;
