import React, { useEffect, useRef } from "react";
import { Engine, Scene, ArcRotateCamera,Vector3,HemisphericLight,MeshBuilder } from "@babylonjs/core";

const BabylonScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Crear el motor y la escena
    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);

    // Configuración básica: luz y cámara
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 4,
      10,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);

    const light = new HemisphericLight(
      "light",
      new Vector3(1, 1, 0),
      scene
    );

    // Crear un objeto
    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

    // Renderizar la escena
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Manejo de limpieza
    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default BabylonScene;
