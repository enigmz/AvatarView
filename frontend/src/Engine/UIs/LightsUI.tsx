import { Scene, Color3 } from "@babylonjs/core";
import Lights from "../Lights/Lights.tsx";

export default class LightUI {
  private container: HTMLElement;

  constructor(scene: Scene, lights: Lights) {
    // Creamos un contenedor para el color picker
    this.container = document.createElement("div");
    this.container.id = "light-ui";
    this.container.style.position = "absolute";
    this.container.style.top = "16%";
    this.container.style.left = "10px";
    this.container.style.padding = "10px";
    this.container.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    this.container.style.color = "white";
    this.container.style.borderRadius = "8px";
    this.container.style.zIndex = "1000";
    this.container.style.maxHeight = "300px";
    this.container.style.overflowY = "auto";
    this.container.style.display = "none";

    document.body.appendChild(this.container);

    // Creamos el color picker
    const colorPickerLabel = document.createElement("label");
    colorPickerLabel.innerText = "Color de la Luz:";
    colorPickerLabel.style.display = "block";
    colorPickerLabel.style.marginBottom = "5px";

    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.style.width = "100%";
    colorPicker.style.marginBottom = "10px";

    // Evento para cambiar el color de la luz
    colorPicker.oninput = (event: Event) => {
      const colorValue = (event.target as HTMLInputElement).value;
      const rgb = this.hexToRgb(colorValue);
      if (rgb) {
        const color = new Color3(rgb.r / 255, rgb.g / 255, rgb.b / 255);
        lights.setLightColor(color);
      }
    };

    this.container.appendChild(colorPickerLabel);
    this.container.appendChild(colorPicker);
  }

  // Método para convertir un color HEX a RGB
  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return match
      ? {
          r: parseInt(match[1], 16),
          g: parseInt(match[2], 16),
          b: parseInt(match[3], 16),
        }
      : null;
  }

  public showLightUI(){
    this.container.style.display = "block";
  }
}
