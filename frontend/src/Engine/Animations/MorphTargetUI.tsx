import {
    Scene,
    AbstractMesh,
  } from "@babylonjs/core";
class MorphTargetUI {
    private container: HTMLElement;
  
    constructor(scene: Scene, model: AbstractMesh) {
      // Crear un contenedor para los sliders
      this.container = document.createElement("div");
      this.container.id = "morph-target-ui";
      this.container.style.position = "absolute";
      this.container.style.top = "10px";
      this.container.style.right = "10px";
      this.container.style.padding = "10px";
      this.container.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      this.container.style.color = "white";
      this.container.style.borderRadius = "8px";
      this.container.style.zIndex = "2";
      this.container.style.height = "95vh";
      this.container.style.overflowY = "auto";
      this.container.style.boxSizing = "border-box";
  
      document.body.appendChild(this.container);
  
      // Configurar los sliders
      this.setupSliders(model);
    }
  
    setupSliders(model: AbstractMesh) {
        console.log(model);
      // Iterar sobre todas las mallas del modelo
      model.getChildMeshes().forEach((mesh) => {
        // Si la malla tiene morph targets
        if (mesh.morphTargetManager) {
          const morphTargetManager = mesh.morphTargetManager;
  
          for (let i = 0; i < morphTargetManager.numTargets; i++) {
            const morphTarget = morphTargetManager.getTarget(i);
  
            if (morphTarget) {
              // Crear un slider para cada morph target
              const slider = this.createSlider(morphTarget.name, morphTarget.influence);
              this.container.appendChild(slider);
  
              // Conectar el slider al morph target
              slider.addEventListener("input", (event: Event) => {
                const value = (event.target as HTMLInputElement).valueAsNumber;
                morphTarget.influence = value;
              });
            }
          }
        }
      });
    }
  
    createSlider(name: string, initialValue: number): HTMLElement {
      const wrapper = document.createElement("div");
      wrapper.style.marginBottom = "10px";
  
      const label = document.createElement("label");
      label.innerText = `${name}:`;
      label.style.display = "block";
      label.style.marginBottom = "5px";
  
      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = "0";
      slider.max = "1";
      slider.step = "0.01";
      slider.value = initialValue.toString();
      slider.style.width = "100%";
  
      wrapper.appendChild(label);
      wrapper.appendChild(slider);
  
      return wrapper;
    }
  }
  
  export default MorphTargetUI;
  