import { Engine, Scene, Color3 } from "@babylonjs/core";
import "@babylonjs/loaders"; // Importa el soporte para cargar archivos GLB/GLTF
import Lights from "./Lights/Lights.tsx";
import Camera from "./Camera/Camera.tsx";
import LoadingScreen from "./Helpers/LoadingScreen.tsx";
import ModelLoader from "./Model/ModelLoader.tsx";

class Viewer {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  private loadingScreen: LoadingScreen;
  private modelLoader: ModelLoader;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    // Inicializar pantalla de carga y cargador de modelos
    this.loadingScreen = new LoadingScreen();
    this.modelLoader = new ModelLoader(this.loadingScreen);

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
    window.addEventListener("resize", this.onResize);
  }

  // Método para manejar el redimensionado
  private onResize = () => {
    this.engine.resize();
  };

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
      helper.setMainColor(Color3.FromHexString("#f0f0f0"));
      if (helper.groundMirror) {
        helper.groundMirror.renderList = []; // Personalizar lista de renderizado
      }
    }

    return helper;
  }

  // Método para cargar un modelo
  async loadModel(modelPath: string) {
    try {
      const meshes = await this.modelLoader.loadModel(this.scene, modelPath);
      console.log("Modelo cargado:", meshes);
      //@ts-ignore para depuración
      window.scene = this.scene;
    } catch (error) {
      console.error("Error al cargar el modelo:", error);
    }
  }

  // Método para limpiar la escena
  dispose() {
    window.removeEventListener("resize", this.onResize);
    this.engine.dispose();
  }
}

export default Viewer;
