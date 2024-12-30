import { Scene, AnimationGroup } from "@babylonjs/core";

class AnimationUI {
  private container: HTMLElement;

  constructor(scene: Scene, animationGroups: AnimationGroup[]) {
    // Crear un contenedor para los controles de animación
    this.container = document.createElement("div");
    this.container.id = "animation-ui";

    // Agregar el contenedor al documento
    document.body.appendChild(this.container);

    // Configurar controles de animación
    this.setupControls(animationGroups);
    this.showAnimationUI();

    // Iniciar seguimiento de animaciones activas al cargar
    this.startTrackingOnLoad(animationGroups);
  }

  setupControls(animationGroups: AnimationGroup[]) {
    animationGroups.forEach((animationGroup, index) => {
      const wrapper = document.createElement("div");
      wrapper.style.marginBottom = "10px";

      const label = document.createElement("label");
      label.innerText = animationGroup.name || `Animación ${index + 1}`;

      const playPauseButton = document.createElement("button");
      playPauseButton.innerText = animationGroup.isPlaying ? "Pausar" : "Reproducir";

      playPauseButton.onclick = () => {
        if (animationGroup.isPlaying) {
          animationGroup.pause();
          playPauseButton.innerText = "Reproducir";
        } else {
          animationGroup.play(true);
          playPauseButton.innerText = "Pausar";
          this.trackAnimationProgress(animationGroup, slider); // Iniciar seguimiento
        }
      };

      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = "0";
      slider.max = "1";
      slider.step = "0.01";

      slider.oninput = (event: Event) => {
        const value = parseFloat((event.target as HTMLInputElement).value);
        animationGroup.goToFrame(animationGroup.to * value);
      };

      // Sincronizar el slider con la posición inicial de la animación
      this.syncSlider(animationGroup, slider);

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
      if (!animationGroup.isPlaying) return; // Detener si la animación está pausada

      this.syncSlider(animationGroup, slider); // Actualizar el slider
      requestAnimationFrame(updateSlider); // Continuar el seguimiento en el próximo frame
    };

    requestAnimationFrame(updateSlider); // Iniciar el seguimiento
  }

  private startTrackingOnLoad(animationGroups: AnimationGroup[]) {
    animationGroups.forEach((animationGroup) => {
      if (animationGroup.isPlaying) {
        const slider = this.container.querySelector(
          `input[type="range"]:nth-child(${animationGroups.indexOf(animationGroup) + 1})`
        ) as HTMLInputElement;

        if (slider) {
          this.trackAnimationProgress(animationGroup, slider); // Iniciar seguimiento de animación activa
        }
      }
    });
  }

  public showAnimationUI() {
    this.container.style.display = "block";
  }
  public getContainer(): HTMLElement {
    return this.container;
  }
  
}

export default AnimationUI;
