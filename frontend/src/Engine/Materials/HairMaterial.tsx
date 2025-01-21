import {
    Scene,
    PBRMaterial,
    Color3,
    Mesh,
    Texture,

  } from "@babylonjs/core";
  
  class HairMaterial {
    private scene: Scene;
    private material: PBRMaterial;
  
    constructor(scene: Scene) {
      this.scene = scene;
  
      // Crear el material PBR
      this.material = new PBRMaterial("hairMaterial", this.scene);
  
      // Color base del pelo
        this.material.albedoColor = new Color3(0.8, 0.6, 0.4);
        this.material.roughness = 0.8;
        this.material.metallic = 1.0;

       
    }
  
    // Método para aplicar el material a una malla
    applyToMesh(mesh: Mesh) {
      mesh.material = this.material;
    }
  
    // Método para personalizar las propiedades del material
    setTintColor(color: Color3) {
      this.material.subSurface.tintColor = color;
    }
  
    // Método para cambiar la textura
    setTexture(texturePath: string) {
      const newTexture = new Texture(texturePath, this.scene);
      this.material.albedoTexture = newTexture;
    }
  }
  
  export default HairMaterial;
  