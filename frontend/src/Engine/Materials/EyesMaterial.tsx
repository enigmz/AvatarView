import {
    Scene,
    PBRMaterial,
    Color3,
    Mesh,
    Texture,
  } from "@babylonjs/core";
  
  class EyesMaterial {
    private scene: Scene;
    private material: PBRMaterial;
  
    constructor(scene: Scene) {
      this.scene = scene;
  
      // Crear el material PBR
      this.material = new PBRMaterial("eyesMaterial", this.scene);
  
      // Configurar las propiedades del material
      this.material.metallic = 0.0; // Sin reflejo metálico
      this.material.roughness = 0.0; // Superficie completamente lisa
      this.material.subSurface.isTranslucencyEnabled = true; // Habilitar translucencia
      this.material.subSurface.tintColor = Color3.White(); // Color de tinte para la translucencia
  
      // Añadir la textura difusa al material
      const texturePath = "/textures/eye.jpg"; // Ruta de la textura en la carpeta `public`
      const eyeTexture = new Texture(texturePath, this.scene);
      this.material.albedoTexture = eyeTexture; // Asignar la textura como albedo (color base)
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
  
  export default EyesMaterial;
  