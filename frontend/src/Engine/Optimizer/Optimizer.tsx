import {
    Scene,
    Mesh,
    SceneOptimizer,
    SceneOptimizerOptions,
    SimplificationType,
    DefaultRenderingPipeline,
    Engine,
  } from "@babylonjs/core";
  
  class SceneOptimizerHelper {
    private scene: Scene;
  
    constructor(scene: Scene) {
      this.scene = scene;
    }
  
    // Método para optimizar dinámicamente la escena
    applyDynamicOptimization(targetFrameRate: number = 60) {
      const options = SceneOptimizerOptions.ModerateDegradationAllowed();
      options.targetFrameRate = targetFrameRate;
  
      SceneOptimizer.OptimizeAsync(this.scene, options, () => {
        console.log("Escena optimizada dinámicamente.");
      });
    }
  
    // Método para simplificar mallas
    simplifyMesh(mesh: Mesh, quality: number = 0.5, distance: number = 10) {
      mesh.simplify(
        [{ quality, distance }],
        true,
        SimplificationType.QUADRATIC
      );
    }
  
    // Método para habilitar el pipeline de renderizado predeterminado
    enableDefaultRenderingPipeline(engine: Engine) {
      const pipeline = new DefaultRenderingPipeline(
        "defaultPipeline",
        true,
        this.scene,
        this.scene.cameras
      );
  
      pipeline.samples = 1; // MSAA
      pipeline.imageProcessing.toneMappingEnabled = true;
      pipeline.imageProcessing.exposure = 1.2;
      pipeline.imageProcessing.contrast = 1.2;
  
      console.log("Pipeline de renderizado predeterminado habilitado.");
    }
  

    // Método para configurar luces optimizadas
    optimizeLighting() {
      this.scene.lights.forEach((light) => {
        light.shadowEnabled = false; // Desactiva sombras si no son necesarias
      });
    }
  
  }
  
  export default SceneOptimizerHelper;
  