import { DefaultLoadingScreen } from "@babylonjs/core";

class LoadingScreen {
  private loadingDiv: HTMLElement | null = null;

  constructor() {
    // Configurar la pantalla de carga personalizada
    DefaultLoadingScreen.prototype.displayLoadingUI = this.displayLoadingUI.bind(this);
    DefaultLoadingScreen.prototype.hideLoadingUI = this.hideLoadingUI.bind(this);
  }

  // Mostrar la pantalla de carga
  displayLoadingUI() {
    if (document.getElementById("customLoadingScreenDiv")) {
      // Si ya existe, simplemente la muestra
      document.getElementById("customLoadingScreenDiv")!.style.display = "flex";
      return;
    }

    // Crear el contenedor principal
    this.loadingDiv = document.createElement("div");
    this.loadingDiv.id = "customLoadingScreenDiv";
    this.loadingDiv.innerHTML = `
      <div>Scene is currently loading...</div>
      <p id="loadingPercentage">0%</p>
    `;

    // Agregar estilos personalizados
    const customLoadingScreenCss = document.createElement("style");
    customLoadingScreenCss.type = "text/css";
    customLoadingScreenCss.innerHTML = `
      #customLoadingScreenDiv {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(120, 120, 120, 0.8);
        color: white;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 9999;
      }
      #customLoadingScreenDiv p {
        font-size: 20px;
        margin-top: 10px;
      }
    `;
    document.head.appendChild(customLoadingScreenCss);

    document.body.appendChild(this.loadingDiv);
  }

  // Actualizar el porcentaje cargado
  updateLoadingPercentage(percent: number) {
    const percentageElement = document.getElementById("loadingPercentage");
    if (percentageElement) {
      percentageElement.textContent = `${percent}%`;
    }
  }

  // Ocultar la pantalla de carga
  hideLoadingUI() {
    const loadingDiv = document.getElementById("customLoadingScreenDiv");
    if (loadingDiv) {
      loadingDiv.style.display = "none";
      console.log("Hiding loading screen.");
    } else {
      console.error("Loading screen element not found.");
    }
  }
}

export default LoadingScreen;
