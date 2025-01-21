import {
  Scene,
  DirectionalLight,
  Vector3,
  Color3,
  ShadowGenerator,
  AbstractMesh,
} from "@babylonjs/core";

export default class Lights {
  private scene: Scene;
  private lights: DirectionalLight[] = [];
  private shadowGenerators: ShadowGenerator[] = [];

  constructor(scene: Scene) {
    this.scene = scene;

    // Crear la luz principal
    const primaryLight = new DirectionalLight("primaryLight", new Vector3(0, -1, 0), this.scene);
    primaryLight.position = new Vector3(0, 10, 0);
    primaryLight.diffuse = new Color3(1, 1, 1);
    primaryLight.specular = new Color3(1, 1, 1);
    this.lights.push(primaryLight);

    // Crear la luz secundaria
    const secondaryLight = new DirectionalLight("secondaryLight", new Vector3(0, -1, 0), this.scene);
    secondaryLight.position = new Vector3(0, 10, 0);
    secondaryLight.diffuse = new Color3(1, 1, 1);
    secondaryLight.specular = new Color3(1, 1, 1);
    this.lights.push(secondaryLight);

    // Crear generadores de sombras para ambas luces
    this.lights.forEach((light) => {
      const shadowGenerator = new ShadowGenerator(1024, light);
      shadowGenerator.useExponentialShadowMap = true;
      shadowGenerator.darkness = 0.7;
      this.shadowGenerators.push(shadowGenerator);
    });
  }

  // Método para habilitar sombras
  enableShadows(meshes: AbstractMesh[]) {
    this.shadowGenerators.forEach((shadowGenerator) => {
      meshes.forEach((mesh) => {
        shadowGenerator.addShadowCaster(mesh);
        mesh.receiveShadows = true;
      });
    });
  }

  // Obtener la lista de luces
  getLights(): DirectionalLight[] {
    return this.lights;
  }

  // Configurar el color de una luz específica
  setLightColor(index: number, color: Color3) {
    if (this.lights[index]) {
      this.lights[index].diffuse = color;
    }
  }

  // Configurar la intensidad de una luz específica
  setLightIntensity(index: number, intensity: number) {
    if (this.lights[index]) {
      this.lights[index].intensity = intensity;
    }
  }
}
