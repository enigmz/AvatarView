import { MorphTarget } from "@babylonjs/core";

type MorphTargetGroup = {
    name: string; // Nombre del grupo
    targets: MorphTarget[]; // Lista de morph targets asociados
  };
  
  /*type AnimationState = {
    group: MorphTargetGroup; // Grupo de morph targets
    duration: number; // Duración de la animación en milisegundos
    loop: boolean; // Si la animación debe repetirse
  };*/
  
  class MorphTargetStateMachine {
    private groups: MorphTargetGroup[] = [];
    private currentAnimation: number | null = null; // Índice de la animación activa
    private isAnimating = false;
  
    // Agregar un grupo de morph targets
    addGroup(name: string, targets: MorphTarget[]) {
      this.groups.push({ name, targets });
    }
  
    // Ejecutar una animación
    async animateGroup(name: string, duration: number, loop = false) {
      const group = this.groups.find((g) => g.name === name);
  
      if (!group) {
        console.error(`No se encontró el grupo de morph targets con el nombre: ${name}`);
        return;
      }
  
      this.isAnimating = true;
      this.currentAnimation = this.groups.indexOf(group);
  
      do {
        // Animar de 0 a 1
        await this.interpolate(group.targets, 0, 1, duration / 2);
        // Animar de 1 a 0
        await this.interpolate(group.targets, 1, 0, duration / 2);
      } while (loop && this.isAnimating);
  
      this.isAnimating = false;
      this.currentAnimation = null;
    }
  
    // Detener la animación actual
    stopAnimation() {
      this.isAnimating = false;
      this.currentAnimation = null;
    }
  
    // Interpolar los valores de los morph targets
    private async interpolate(targets: MorphTarget[], from: number, to: number, duration: number) {
      return new Promise<void>((resolve) => {
        const startTime = performance.now();
        const step = () => {
          const elapsed = performance.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const value = from + (to - from) * progress;
  
          targets.forEach((target) => {
            target.influence = value;
          });
  
          if (progress < 1 && this.isAnimating) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        };
        step();
      });
    }
  }
  
  export default MorphTargetStateMachine;
