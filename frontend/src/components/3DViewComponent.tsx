import React, { useEffect, useRef } from "react";
import Viewer from "./../Engine/Viewer.tsx";
import './3DViewComponent.scss';

const ThreeDViewComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const initializedRef = useRef(false); // Bandera para evitar doble inicialización

  useEffect(() => {
    if (!initializedRef.current && canvasRef.current) {
      viewerRef.current = new Viewer(canvasRef.current);
      initializedRef.current = true; // Marcar como inicializado
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ThreeDViewComponent;
