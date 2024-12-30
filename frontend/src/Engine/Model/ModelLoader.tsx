import { Scene, AbstractMesh, SceneLoader  } from "@babylonjs/core";
import LoadingScreen from "../UIs/LoadingScreen.tsx";
import MorphTargetUI from "../UIs/MorphTargetUI.tsx";
import AnimationUI from "../UIs/AnimationsUI.tsx";
import MorphTargetStateMachine from "../Animations/StateMachines/MorphStateMachine.tsx";
import GeneralUI from "../UIs/GeneralUI.tsx";

//import HeadTracking from "../Skeleton/HeadTracking.tsx";
import "@babylonjs/inspector";
//import createBoneWeightShaderMaterial from '../Shaders/BoneWeightCustomMaterial.tsx';

class ModelLoader {
  private loadingScreen: LoadingScreen;
  private generalUI: GeneralUI;
  private morphTargetUI: MorphTargetUI;
  private animationUI: AnimationUI;

  constructor(loadingScreen: LoadingScreen,generalUI: GeneralUI) {
    this.loadingScreen = loadingScreen;
    this.generalUI = generalUI;

  }

  async loadModel(scene: Scene, modelPath: string): Promise<AbstractMesh[]> {
    try {
        this.loadingScreen.displayLoadingUI();

        return new Promise((resolve, reject) => {
            SceneLoader.ImportMesh(
                "",
                "",
                modelPath, // Ruta del modelo GLB
                scene, // Escena en la que se cargará el modelo
                (meshes, particleSystems, skeletons, animationGroups) => {
                    // Verifica si hay mallas cargadas
                    if (meshes.length > 0) {
                        const mainMesh = meshes[0]; // Suponiendo que la malla principal es la primera
                        if (mainMesh && mainMesh.getVerticesData) {
                            const matricesWeights = mainMesh.getVerticesData("MatricesWeightsKind");
                            if (!matricesWeights) {
                                console.error("The attribute matricesWeights is missing from the mesh.");
                            } else {
                                console.log("Matrices weights found:", matricesWeights);
                            }
                        }
                        // Si hay esqueletos, configura la visualización
                        //if (skeletons.length > 0) {
                            //const skeleton = skeletons[0];

                          // Crear el material de visualización de pesos de huesos
                            //const boneWeightShader = createBoneWeightShaderMaterial(scene);
                            //console.log(boneWeightShader);
                            // Aplicar el material a la malla principal
                            //mainMesh.material = boneWeightShader;

                            // Configuración opcional para mejorar la visualización
                            ///mainMesh.skeleton = skeleton;
                            // Ejemplo de seguimiento de cabeza
                            //new HeadTracking(scene, skeleton, mainMesh, "head.x");
                        //}

                        // Crear la UI de morph targets
                        this.morphTargetUI = new MorphTargetUI(scene, mainMesh);
                        this.generalUI.registerUIElement(this.morphTargetUI.getContainer());
                        const morphStateMachine = new MorphTargetStateMachine(scene, mainMesh);
                        

                        // Añadimos animaciones de morph targets
                        morphStateMachine.push({ name: "blink", timing: 100 });
                        morphStateMachine.start();
                    }

                    // Configuración de la UI de animaciones si existen animaciones
                    if (animationGroups.length > 0) {
                        this.animationUI = new AnimationUI(scene, animationGroups);
                        this.generalUI.registerUIElement(this.animationUI.getContainer());
                    }

                    // Ocultar pantalla de carga y mostrar DebugLayer
                    this.loadingScreen.hideLoadingUI();
                    /*scene.debugLayer.show({
                        embedMode: true, // Muestra el inspector incrustado en la ventana
                    });*/

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
