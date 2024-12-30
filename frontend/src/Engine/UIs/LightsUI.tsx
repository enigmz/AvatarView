import { Scene, Color3 } from "@babylonjs/core";
import Lights from "../Lights/Lights.tsx";

export default class LightUI {
  private container: HTMLElement;

  constructor(scene: Scene, lights: Lights) {
    // Crear contenedor para los controles de luz
    this.container = document.createElement("div");
    this.container.id = "light-ui";

    document.body.appendChild(this.container);

    // Crear controles
    this.createColorPicker(lights);
    this.createIntensitySlider(lights);
  }

  // Método para crear el color picker
  private createColorPicker(lights: Lights) {
    const label = document.createElement("label");
    label.innerText = "Color de la Luz:";

    const colorPicker = document.createElement("input");
    colorPicker.type = "color";

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

    const intensitySlider = document.createElement("input");
    intensitySlider.type = "range";
    intensitySlider.min = "0";
    intensitySlider.max = "2"; // Ajusta el rango según sea necesario
    intensitySlider.step = "0.1";
    intensitySlider.value = "1";

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

  public getContainer(): HTMLElement {
    return this.container;
  }
  
}
