import { Scene, Color3 } from "@babylonjs/core";
import Lights from "../Lights/Lights.tsx";

export default class LightUI {
  private container: HTMLElement;

  constructor(scene: Scene, lights: Lights) {
    // Creamos un contenedor para los controles de la luz
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

    // Crear controles
    this.createColorPicker(lights);
    this.createIntensitySlider(lights);
  }

  // Método para crear el color picker
  private createColorPicker(lights: Lights) {
    const label = document.createElement("label");
    label.innerText = "Color de la Luz:";
    label.style.display = "block";
    label.style.marginBottom = "5px";

    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.style.width = "100%";
    colorPicker.style.marginBottom = "10px";

    colorPicker.oninput = (event: Event) => {
      const colorValue = (event.target as HTMLInputElement).value;
      const rgb = this.hexToRgb(colorValue);
      if (rgb) {
        const color = new Color3(rgb.r / 255, rgb.g / 255, rgb.b / 255);
        lights.setLightColor(color);
      }
    };

    this.container.appendChild(label);
    this.container.appendChild(colorPicker);
  }

  // Método para crear el slider de intensidad
  private createIntensitySlider(lights: Lights) {
    const label = document.createElement("label");
    label.innerText = "Intensidad de la Luz:";
    label.style.display = "block";
    label.style.marginBottom = "5px";

    const intensitySlider = document.createElement("input");
    intensitySlider.type = "range";
    intensitySlider.min = "0";
    intensitySlider.max = "2"; // Aumentar si deseas un rango mayor
    intensitySlider.step = "0.1";
    intensitySlider.value = "1"; // Valor inicial
    intensitySlider.style.width = "100%";

    intensitySlider.oninput = (event: Event) => {
      const value = parseFloat((event.target as HTMLInputElement).value);
      lights.setLightIntensity(value);
    };

    this.container.appendChild(label);
    this.container.appendChild(intensitySlider);
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

  public showLightUI() {
    this.container.style.display = "block";
  }
}
