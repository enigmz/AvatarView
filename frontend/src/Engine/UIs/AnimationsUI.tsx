import { Scene, AnimationGroup } from "@babylonjs/core";

class AnimationUI {
  private container: HTMLElement;

  constructor(scene: Scene, animationGroups: AnimationGroup[]) {
    // Crear un contenedor para los controles de animación
    this.container = document.createElement("div");
    this.container.id = "animation-ui";
    this.container.style.position = "absolute";
    this.container.style.top = "10px";
    this.container.style.left = "10px";
    this.container.style.padding = "10px";
    this.container.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    this.container.style.color = "white";
    this.container.style.borderRadius = "8px";
    this.container.style.zIndex = "1000";
    this.container.style.maxHeight = "300px";
    this.container.style.overflowY = "auto";

    document.body.appendChild(this.container);

    // Configurar controles de animación
    this.setupControls(animationGroups);
  }

  setupControls(animationGroups: AnimationGroup[]) {
    animationGroups.forEach((animationGroup, index) => {
      const wrapper = document.createElement("div");
      wrapper.style.marginBottom = "10px";

      // Nombre de la animación
      const label = document.createElement("label");
      label.innerText = animationGroup.name || `Animación ${index + 1}`;
      label.style.display = "block";
      label.style.marginBottom = "5px";

      // Botón de reproducir/pausar
      const playPauseButton = document.createElement("button");
      playPauseButton.style.marginRight = "5px";

      // Sincronizar el estado inicial del botón
      playPauseButton.innerText = animationGroup.isPlaying ? "Pausar" : "Reproducir";

      playPauseButton.onclick = () => {
        if (animationGroup.isPlaying) {
          animationGroup.pause();
          playPauseButton.innerText = "Reproducir";
        } else {
          animationGroup.play(true); // Reproducir en bucle
          playPauseButton.innerText = "Pausar";

          // Actualizar el slider mientras la animación está en ejecución
          this.trackAnimationProgress(animationGroup, slider);
        }
      };

      // Slider de progreso
      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = "0";
      slider.max = "1";
      slider.step = "0.01";
      slider.style.width = "100%";

      slider.oninput = (event: Event) => {
        const value = parseFloat((event.target as HTMLInputElement).value);
        animationGroup.goToFrame(animationGroup.to * value);
      };

      // Sincronizar el slider al cargar
      this.syncSlider(animationGroup, slider);

      // Agregar controles al contenedor
      wrapper.appendChild(label);
      wrapper.appendChild(playPauseButton);
      wrapper.appendChild(slider);
      this.container.appendChild(wrapper);
    });
  }

  private syncSlider(animationGroup: AnimationGroup, slider: HTMLInputElement) {
    if (animationGroup.targetedAnimations.length > 0) {
      const currentAnimation = animationGroup.targetedAnimations[0].animation.runtimeAnimations[0];
      if (currentAnimation) {
        const currentFrame = currentAnimation.currentFrame;
        slider.value = (currentFrame / animationGroup.to).toString();
      }
    }
  }

  private trackAnimationProgress(animationGroup: AnimationGroup, slider: HTMLInputElement) {
    const updateSlider = () => {
      if (!animationGroup.isPlaying) return; // Detener el seguimiento si la animación se detiene

      this.syncSlider(animationGroup, slider);
      requestAnimationFrame(updateSlider); // Continuar el seguimiento
    };

    requestAnimationFrame(updateSlider);
  }
}

export default AnimationUI;
