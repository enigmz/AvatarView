import { EnvironmentHelper, Color3, Scene } from "@babylonjs/core";

class EnvironmentUI {
  private helper: EnvironmentHelper;
  private container: HTMLElement;
  private scene: Scene;

  constructor(helper: EnvironmentHelper, scene: Scene) {
    this.helper = helper;
    this.scene = scene;

    this.container = document.createElement("div");
    this.container.id = "environment-ui";

    document.body.appendChild(this.container);

    const intensitySlider = document.createElement("input");
    intensitySlider.type = "range";
    intensitySlider.min = "0";
    intensitySlider.max = "1";
    intensitySlider.step = "0.01";
    intensitySlider.value = "0.5";

    intensitySlider.oninput = (event: Event) => {
      const value = parseFloat((event.target as HTMLInputElement).value);
      this.scene.environmentIntensity = value;
    };

    this.container.appendChild(intensitySlider);
    this.createColorPicker();
  }

  private createColorPicker() {
    const label = document.createElement("label");
    label.innerText = "Color de fondo:";

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = "#FFFFFF";

    colorInput.oninput = (event: Event) => {
      const colorValue = (event.target as HTMLInputElement).value;
      this.updateBackgroundColor(colorValue);
    };

    this.container.appendChild(label);
    this.container.appendChild(colorInput);
  }

  private updateBackgroundColor(hexColor: string) {
    const color = Color3.FromHexString(hexColor);
    this.helper.setMainColor(color);
  }

  public showEnvironmentUI() {
    this.container.style.display = "block";
  }
  public getContainer(): HTMLElement {
    return this.container;
  }
  
}

export default EnvironmentUI;
