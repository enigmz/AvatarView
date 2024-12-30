class GeneralUI {
    private uiElements: HTMLElement[] = [];
    private toggleButton: HTMLElement;
  
    constructor() {
      this.toggleButton = this.setupToggleUI();
      this.hideToggleButton(); // Esconder el botón al inicio
    }
  
    // Método para registrar elementos de la UI
    public registerUIElement(element: HTMLElement) {
      this.uiElements.push(element);
    }
  
    // Método para alternar la visibilidad de los elementos de la UI
    public toggleUI() {
      this.uiElements.forEach((element) => {
        element.style.display = element.style.display === "none" ? "block" : "none";
      });
    }
  
    // Método para inicializar el botón de toggle en la página
    private setupToggleUI(): HTMLElement {
      const toggleButton = document.createElement("button");
      toggleButton.id = "toggle-ui-button";
      toggleButton.innerText = "Toggle UI";
  
      toggleButton.addEventListener("click", () => this.toggleUI());
      document.body.appendChild(toggleButton);
  
      return toggleButton;
    }
  
    // Método para mostrar el botón
    public showToggleButton() {
      this.toggleButton.style.display = "block";
    }
  
    // Método para esconder el botón
    public hideToggleButton() {
      this.toggleButton.style.display = "none";
    }
  }
  
  export default GeneralUI;
  