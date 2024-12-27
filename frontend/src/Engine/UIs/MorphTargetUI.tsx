import { Scene, AbstractMesh, MorphTarget } from "@babylonjs/core";

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

    // Configurar los sliders agrupados
    this.setupGroupedSliders(model);
  }

  setupGroupedSliders(model: AbstractMesh) {
    // Objeto para agrupar los morph targets por nombre
    const groupedMorphTargets: Record<string, MorphTarget[]> = {};

    // Iterar sobre todas las mallas del modelo
    model.getChildMeshes().forEach((mesh) => {
      if (mesh.morphTargetManager) {
        const morphTargetManager = mesh.morphTargetManager;

        for (let i = 0; i < morphTargetManager.numTargets; i++) {
          const morphTarget = morphTargetManager.getTarget(i);

          if (morphTarget) {
            // Agrupar morph targets por nombre
            if (!groupedMorphTargets[morphTarget.name]) {
              groupedMorphTargets[morphTarget.name] = [];
            }
            groupedMorphTargets[morphTarget.name].push(morphTarget);
          }
        }
      }
    });

    // Crear sliders y botones para cada grupo de morph targets
    Object.keys(groupedMorphTargets).forEach((name) => {
      const targets = groupedMorphTargets[name];

      // Usar la influencia del primer target como inicial
      const initialValue = targets[0].influence;

      // Crear contenedor para slider y botón
      const wrapper = this.createSliderAndButton(name, initialValue);

      // Obtener referencias al slider y al botón
      const slider = wrapper.querySelector("input") as HTMLInputElement;
      const button = wrapper.querySelector("button") as HTMLButtonElement;

      // Agregar evento al slider para ajustar todos los morph targets del grupo
      slider.addEventListener("input", (event: Event) => {
        const value = (event.target as HTMLInputElement).valueAsNumber;
        targets.forEach((target) => (target.influence = value));
      });

      // Agregar evento al botón para iniciar la animación
      button.addEventListener("click", () => {
        this.animateGroup(targets, slider, 1000); // Duración de 1 segundo
      });

      this.container.appendChild(wrapper);
    });
  }

  createSliderAndButton(name: string, initialValue: number): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "20px";

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
    slider.style.width = "80%";

    const button = document.createElement("button");
    button.innerText = "Play";
    button.style.marginLeft = "10px";

    wrapper.appendChild(label);
    wrapper.appendChild(slider);
    wrapper.appendChild(button);

    return wrapper;
  }

  async animateGroup(
    targets: MorphTarget[],
    slider: HTMLInputElement,
    duration: number
  ) {
    const startTime = performance.now();

    const step = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Interpolar influencia de 0 a 1 y de regreso
      const influence = progress <= 0.5 ? progress * 2 : (1 - progress) * 2;

      // Actualizar morph targets y slider
      targets.forEach((target) => (target.influence = influence));
      slider.value = influence.toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    step();
  }
}

export default MorphTargetUI;
