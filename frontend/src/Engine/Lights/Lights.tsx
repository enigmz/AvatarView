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
  private light: DirectionalLight;
  private shadowGenerator: ShadowGenerator | null = null;

  constructor(scene: Scene) {
    this.scene = scene;

    // Crear la luz direccional
    this.light = new DirectionalLight("directionalLight", new Vector3(0, -1, 0), this.scene);

    // Posicionar la luz por encima del modelo
    this.light.position = new Vector3(0, 10, 0);

    // Establecer un color inicial
    this.light.diffuse = new Color3(1, 1, 1); // Blanco
    this.light.specular = new Color3(1, 1, 1);
  }

  // Método para habilitar sombras en el modelo
  enableShadows(targetMesh: AbstractMesh) {
    if (!this.shadowGenerator) {
      this.shadowGenerator = new ShadowGenerator(1024, this.light);
      this.shadowGenerator.useExponentialShadowMap = true; // Mejora la calidad de las sombras
    }

    // Hacer que el modelo genere sombras
    this.shadowGenerator.addShadowCaster(targetMesh);

    // Hacer que otros objetos reciban sombras (opcional)
    targetMesh.receiveShadows = true;
  }

  // Método para cambiar el color de la luz
  setLightColor(color: Color3) {
    this.light.diffuse = color;
  }

  // Método para cambiar la intensidad de la luz
  setLightIntensity(intensity: number) {
    this.light.intensity = intensity;
  }

}
