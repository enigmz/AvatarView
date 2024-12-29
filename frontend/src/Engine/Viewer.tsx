import { Engine, Scene, Color3,Mesh } from "@babylonjs/core";
import "@babylonjs/loaders"; // Importa el soporte para cargar archivos GLB/GLTF
import Lights from "./Lights/Lights.tsx";
import LightUI from "./UIs/LightsUI.tsx";
import EnvironmentUI from "./UIs/EnvironmentUI.tsx";
import Camera from "./Camera/Camera.tsx";
import LoadingScreen from "./Helpers/LoadingScreen.tsx";
import ModelLoader from "./Model/ModelLoader.tsx";
import EyesMaterial from "./Materials/EyesMaterial.tsx"; 
import SceneOptimizerHelper from './Optimizer/Optimizer.tsx';

class Viewer {
  canvas: HTMLCanvasElement;
  private engine: Engine;
  private scene: Scene;
  private loadingScreen: LoadingScreen;
  private modelLoader: ModelLoader;
  private lights: Lights;
  private lightsUI: LightUI;
  private environmentUI: EnvironmentUI | null = null;


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
    this.lights = new Lights(this.scene);
    // Crear la interfaz para controlar la luz
    this.lightsUI = new LightUI(this.scene, this.lights);

    // Crear entorno
    this.createEnvironment();

    // Cargar el modelo GLB
    this.loadModel("/models/avatar.glb");

    // Crear una instancia de la clase de optimización
    const optimizer = new SceneOptimizerHelper(this.scene);
    // Aplicar optimizaciones
    optimizer.applyDynamicOptimization(60); // Optimización dinámica
    //optimizer.enableDefaultRenderingPipeline(this.engine); // Pipeline predeterminado
    //optimizer.optimizeLighting(); // Optimización de luces

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
      groundOpacity: 0.5, // Reducir la opacidad del suelo
      groundMirrorAmount: 1.0,
      groundMirrorFresnelWeight: 0.5,
      groundMirrorSizeRatio: 400,
      groundMirrorBlurKernel: 80,
      groundShadowLevel: 0.5, // Reducir la intensidad de las sombras en el suelo
      cameraContrast: 1.2, // Ajustar contraste
      cameraExposure: 0.8, // Reducir la exposición para menor intensidad
      sizeAuto: false,
    });
  
    if (helper) {
      // Crear la instancia de EnvironmentUI
      this.environmentUI = new EnvironmentUI(helper,this.scene);
  
      helper.setMainColor(Color3.FromHexString("#e0e0e0")); // Color de fondo más suave
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
      // Crear una instancia de EyesMaterial
      const eyesMaterial = new EyesMaterial(this.scene);
      meshes.forEach(mesh => {
        if (mesh instanceof Mesh) {
          if (mesh.name.includes("Eye")) {
            eyesMaterial.applyToMesh(mesh); // Aplica el material a la malla
          }
      
          // Habilitar sombras en las mallas de tipo Mesh
          //this.lights.enableShadows(mesh);
        }
      });
      this.lightsUI.showLightUI();
      if (this.environmentUI) {
        this.environmentUI.showEnvironmentUI();
      }
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
