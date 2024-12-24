import {
    Scene,
    Vector3,
    ArcRotateCamera,
  } from "@babylonjs/core";
export default class Camera{
    camera: ArcRotateCamera;
    canvas: HTMLCanvasElement;
    scene: Scene;
    constructor(scene:Scene,canvas:HTMLCanvasElement){
        this.scene = scene;
        this.canvas = canvas;
          // Configurar cámara
      this.camera = new ArcRotateCamera(
        "camera",
        1.5611,
        1.44,
        2.48,
        new Vector3(0, 0, 0),
        this.scene
      );
      this.camera.setTarget(new Vector3(0,0.9,0));
      this.camera.upperRadiusLimit = 8;
      this.camera.lowerRadiusLimit = 2;
      this.camera.alpha = 1.56;
      this.camera.beta = 1.44;
      this.camera.radius = 2.5;
      this.camera.wheelPrecision = 50; // Zoom más lento (ajusta el valor según necesites)
      //this.camera.panningSensibility = 100; // Paneo más lento (0 deshabilita el paneo)
      this.camera.inertia = 0.9; // Reduce el tiempo de desaceleración
      //this.camera.angularSensibilityX = 2000; // Más alto significa rotación más lenta
      //this.camera.angularSensibilityY = 2000;
      this.camera.minZ = 0.1;
      this.camera.attachControl(this.canvas, true);
    }
}