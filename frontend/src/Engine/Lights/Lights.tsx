import {
    Scene,
    HemisphericLight,
    Vector3,
  } from "@babylonjs/core";

export default class Lights{
    scene: Scene;
    constructor(scene: Scene){
        this.scene = scene;
        new HemisphericLight(
            "light",
            new Vector3(0, 1, 0),
            this.scene
        );
    }
}