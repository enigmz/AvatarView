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

      wrapper.appendChild(label);
      wrapper.appendChild(playPauseButton);
      wrapper.appendChild(slider);
      this.container.appendChild(wrapper);
    });
  }

  public showAnimationUI() {
    this.container.style.display = "block";
  }
}

export default AnimationUI;
