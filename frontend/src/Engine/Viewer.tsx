import {
    Engine,
    Scene,
    Color3,
  } from "@babylonjs/core";
  import "@babylonjs/loaders"; // Importa el soporte para cargar archivos GLB/GLTF
  import Lights from "./Lights/Lights.tsx";
  import Camera from "./Camera/Camera.tsx";
  
  class Viewer {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;
  
    constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
  
      // Inicializar el motor y la escena
      this.engine = new Engine(this.canvas, true);
      this.scene = new Scene(this.engine);
  
      // Crear cámara y luces
      new Camera(this.scene, this.canvas);
      new Lights(this.scene);
  
      // Crear entorno
      this.createEnvironment();
  
      // Cargar el modelo GLB
      this.loadModel("/models/avatar.glb");
  
      // Iniciar el bucle de renderizado
      this.engine.runRenderLoop(() => {
        this.scene.render();
      });
  
      // Manejar redimensionado
      window.addEventListener("resize", () => {
        this.engine.resize();
      });
    }
  
    // Método para crear el entorno
    createEnvironment() {
        const helper = this.scene.createDefaultEnvironment({
          enableGroundMirror: true,
          groundSize: 1,
          createSkybox: true,
          groundMirrorFallOffDistance: 1500,
          groundYBias: 0.2,
          groundOpacity: 0.7,
          groundMirrorAmount: 1.5,
          groundMirrorFresnelWeight: 0.75,
          groundMirrorSizeRatio: 400,
          groundMirrorBlurKernel: 80,
          groundShadowLevel: 0.8,
          cameraContrast: 1.6,
          cameraExposure: 1,
          sizeAuto: false,
        });
      
        if (helper) {
          // Configurar el color principal del entorno
          helper.setMainColor(Color3.FromHexString("#f0f0f0"));
      
          // Si necesitas modificar la lista de renderizado del espejo, utiliza los métodos adecuados.
          // Por ejemplo, podrías agregar elementos a la lista así:
          if (helper.groundMirror) {
            helper.groundMirror.renderList = []; // Vaciar o personalizar la lista de renderizado
          }
        }
      
        return helper;
      }
      
  
    // Método para cargar un modelo GLB
    async loadModel(modelPath: string) {
      const { SceneLoader } = await import("@babylonjs/core"); // Importar SceneLoader dinámicamente
      SceneLoader.Append("", modelPath, this.scene, (scene) => {
        console.log("Modelo cargado:", scene);
        // @ts-ignore: Para depuración
        window.scene = scene;
      });
    }
  
    // Método para limpiar la escena
    dispose() {
      this.engine.dispose();
    }
  }
  
  export default Viewer;
  