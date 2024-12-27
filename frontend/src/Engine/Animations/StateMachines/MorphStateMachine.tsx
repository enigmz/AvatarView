import { Scene, AbstractMesh, MorphTarget } from "@babylonjs/core";

type MorphTargetAnimation = {
  name: string; // Nombre del grupo de morph targets
  timing: number; // Duración de la animación en milisegundos
};

class MorphTargetStateMachine {
  private scene: Scene;
  private model: AbstractMesh;
  private morphGroups: Record<string, MorphTarget[]> = {};
  private animations: MorphTargetAnimation[] = [];
  private isRunning = false;

  constructor(scene: Scene, model: AbstractMesh) {
    this.scene = scene;
    this.model = model;

    // Agrupar los morph targets por nombre
    this.initializeMorphGroups();
  }

  private initializeMorphGroups() {
    this.model.getChildMeshes().forEach((mesh) => {
      if (mesh.morphTargetManager) {
        const manager = mesh.morphTargetManager;

        for (let i = 0; i < manager.numTargets; i++) {
          const morphTarget = manager.getTarget(i);
          if (morphTarget) {
            if (!this.morphGroups[morphTarget.name]) {
              this.morphGroups[morphTarget.name] = [];
            }
            this.morphGroups[morphTarget.name].push(morphTarget);
          }
        }
      }
    });
  }

  // Añadir una nueva animación a la máquina de estados
  push(animation: MorphTargetAnimation) {
    if (!this.morphGroups[animation.name]) {
      console.warn(`El grupo de morph targets con el nombre "${animation.name}" no existe.`);
      return;
    }
    this.animations.push(animation);
  }

  // Iniciar la ejecución aleatoria de animaciones
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.executeRandomAnimation();
  }

  // Detener la ejecución de animaciones
  stop() {
    this.isRunning = false;
  }

  // Ejecutar una animación específica
  private async animateGroup(name: string, timing: number) {
    const targets = this.morphGroups[name];
    if (!targets) {
      console.warn(`El grupo de morph targets con el nombre "${name}" no existe.`);
      return;
    }
  
    // Función para realizar la interpolación
    const animate = (from: number, to: number, duration: number) => {
      return new Promise<void>((resolve) => {
        const startTime = performance.now();
  
        const step = () => {
          const elapsed = performance.now() - startTime;
          const progress = Math.min(elapsed / duration, 1); // Normaliza el progreso entre 0 y 1
          const influence = from + (to - from) * progress; // Calcula la influencia actual
  
          // Actualiza la influencia de los morph targets
          targets.forEach((target) => (target.influence = influence));
  
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        };
        step();
      });
    };
  
    // Animar de 0 a 1 y luego de 1 a 0
    await animate(0, 1, timing / 2);
    await animate(1, 0, timing / 2);
  }
  

  // Ejecutar una animación aleatoria
  private async executeRandomAnimation() {
    while (this.isRunning) {
      const randomIndex = Math.floor(Math.random() * this.animations.length);
      const animation = this.animations[randomIndex];

      if (animation) {
        await this.animateGroup(animation.name, animation.timing);
      }

      // Pausa aleatoria entre animaciones
      const randomDelay = Math.random() * 2000 + 500; // Entre 500ms y 2500ms
      await new Promise((resolve) => setTimeout(resolve, randomDelay));
    }
  }
}

export default MorphTargetStateMachine;
