import { EnvironmentHelper, Color3,Scene } from "@babylonjs/core";

class EnvironmentUI {
  private helper: EnvironmentHelper;
  private container: HTMLElement;
  private scene: Scene;

  constructor(helper: EnvironmentHelper, scene: Scene) {
    this.helper = helper;
    this.scene = scene;
    
    // Crear un contenedor para la interfaz
    this.container = document.createElement("div");
    this.container.id = "environment-ui";
    this.container.style.position = "absolute";
    this.container.style.top = "40%";
    this.container.style.left = "10px";
    this.container.style.padding = "10px";
    this.container.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    this.container.style.color = "white";
    this.container.style.borderRadius = "8px";
    this.container.style.zIndex = "1000";
    this.container.style.maxWidth = "200px";
    this.container.style.display = "none";

    document.body.appendChild(this.container);

    const intensitySlider = document.createElement("input");
    intensitySlider.type = "range";
    intensitySlider.min = "0";
    intensitySlider.max = "1";
    intensitySlider.step = "0.01";
    intensitySlider.value = "0.5";
    intensitySlider.style.width = "100%";
    
    intensitySlider.oninput = (event: Event) => {
      const value = parseFloat((event.target as HTMLInputElement).value);
      this.scene.environmentIntensity = value;
    };
    
    this.container.appendChild(intensitySlider);
    
    // Crear el control del selector de color
    this.createColorPicker();
  }

  private createColorPicker() {
    const label = document.createElement("label");
    label.innerText = "Color de fondo:";
    label.style.display = "block";
    label.style.marginBottom = "5px";

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = "#FFFFFF"; // Valor inicial (blanco)
    colorInput.style.width = "100%";

    colorInput.oninput = (event: Event) => {
      const colorValue = (event.target as HTMLInputElement).value;
      this.updateBackgroundColor(colorValue);
    };

    this.container.appendChild(label);
    this.container.appendChild(colorInput);
  }

  private updateBackgroundColor(hexColor: string) {
    const color = Color3.FromHexString(hexColor);

    // Cambiar el color principal del entorno
    this.helper.setMainColor(color);
  }

  public showEnvironmentUI(){
    this.container.style.display = "block";
  }
}

export default EnvironmentUI;
