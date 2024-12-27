import {
    Scene,
    HemisphericLight,
    Vector3,
    Color3,
  } from "@babylonjs/core";
  
  export default class Lights {
    scene: Scene;
    light: HemisphericLight;
  
    constructor(scene: Scene) {
      this.scene = scene;
  
      // Crear la luz hemisférica
      this.light = new HemisphericLight(
        "light",
        new Vector3(0, 1, 0),
        this.scene
      );
  
      // Establecer un color inicial
      this.light.diffuse = new Color3(1, 1, 1); // Blanco
    }
  
    // Método para cambiar el color de la luz
    setLightColor(color: Color3) {
      this.light.diffuse = color;
    }
  }
  