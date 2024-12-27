import { Scene, Skeleton, Bone, Vector3, Quaternion, TransformNode, Space } from "@babylonjs/core";

class HeadTracking {
  private scene: Scene;
  private skeleton: Skeleton;
  private headBone: Bone | null = null;
  private rootNode: TransformNode;
  private initialRotation: Quaternion | null = null;

  constructor(scene: Scene, skeleton: Skeleton, rootNode: TransformNode, headBoneName: string) {
    this.scene = scene;
    this.skeleton = skeleton;
    this.rootNode = rootNode;

    // Buscar el hueso de la cabeza en el esqueleto
    this.headBone = this.skeleton.bones.find((bone) => bone.name === headBoneName) || null;

    if (!this.headBone) {
      console.warn(`No se encontró un hueso con el nombre "${headBoneName}".`);
      return;
    }

    // Obtener la rotación inicial del hueso
    this.initialRotation = this.headBone.getRotationQuaternion(Space.LOCAL)?.clone() || Quaternion.Identity();

    // Detener cualquier animación asociada al esqueleto
    this.stopSkeletonAnimations();

    // Configurar el seguimiento de la cámara
    this.setupCameraTracking();
  }

  private stopSkeletonAnimations() {
    // Detener todas las animaciones activas del esqueleto
    this.scene.animationGroups.forEach((group) => group.stop());

    // Eliminar animaciones específicas del hueso
    if (this.headBone) {
      this.headBone.animations = [];
      this.scene.stopAnimation(this.headBone);
    }
  }

  private setupCameraTracking() {
    this.scene.registerBeforeRender(() => {
      if (!this.headBone || !this.initialRotation || !this.scene.activeCamera) return;

      const cameraPosition = this.scene.activeCamera.position;

      // Obtener la posición del hueso en el espacio mundial
      const headPosition = this.headBone.getAbsolutePosition(this.rootNode);

      // Calcular la dirección hacia la cámara
      const directionToCamera = cameraPosition.subtract(headPosition).normalize();

      // Calcular los ángulos para rotación en Y (yaw) y X (pitch)
      const targetYaw = Math.atan2(-directionToCamera.x, -directionToCamera.z); // Horizontal
      const targetPitch = Math.asin(-directionToCamera.y); // Vertical

      // Crear quaternions para las rotaciones
      const yawRotation = Quaternion.RotationAxis(Vector3.Up(), targetYaw); // Eje Y
      const pitchRotation = Quaternion.RotationAxis(Vector3.Right(), targetPitch); // Eje X

      // Combinar las rotaciones y aplicar la inicial
      const finalRotation = yawRotation.multiply(pitchRotation).multiply(this.initialRotation);

      // Interpolar hacia la rotación deseada para suavizar el movimiento
      const currentRotation = this.headBone.getRotationQuaternion(Space.LOCAL) || Quaternion.Identity();
      const interpolatedRotation = Quaternion.Slerp(currentRotation, finalRotation, 0.05);

      // Aplicar la rotación interpolada al hueso
      this.headBone.setRotationQuaternion(interpolatedRotation, Space.LOCAL);

      // Recalcular las transformaciones absolutas del esqueleto
      this.skeleton.computeAbsoluteMatrices();
    });
  }
}

export default HeadTracking;
