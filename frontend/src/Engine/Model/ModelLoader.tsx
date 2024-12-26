import { Scene, AbstractMesh, SceneLoader } from "@babylonjs/core";
import LoadingScreen from "../Helpers/LoadingScreen.tsx";
import MorphTargetUI from "../Animations/MorphTargetUI.tsx";

class ModelLoader {
  private loadingScreen: LoadingScreen;

  constructor(loadingScreen: LoadingScreen) {
    this.loadingScreen = loadingScreen;
  }

  async loadModel(scene: Scene, modelPath: string): Promise<AbstractMesh[]> {
    try {
      this.loadingScreen.displayLoadingUI();

      return new Promise((resolve, reject) => {
        SceneLoader.ImportMesh(
          "", // Identificador vacío para importar todo el contenido
          "", // Ruta base (puedes especificar si el archivo está en un subdirectorio)
          modelPath, // Ruta del modelo GLB
          scene, // Escena en la que se cargará el modelo
          (meshes, particleSystems, skeletons, animationGroups) => {
            // Cargar la UI de morph targets si hay morph targets
            if (meshes.length > 0) {
              new MorphTargetUI(scene, meshes[0]);
            }

            // Ocultar pantalla de carga y resolver con las mallas cargadas
            this.loadingScreen.hideLoadingUI();
            resolve(meshes);
          },
          (evt) => {
            const loadedStr = evt.loaded.toString();
            const firstTwoNumbers = parseInt(loadedStr.substring(0, 2), 10);
            this.loadingScreen.updateLoadingPercentage(firstTwoNumbers);
            
          }
        );
      });
    } catch (error) {
      console.error("Error cargando el modelo:", error);
      this.loadingScreen.hideLoadingUI();
      throw error;
    }
  }
}

export default ModelLoader;
