import { ShaderMaterial, Scene } from "@babylonjs/core";

export default function createBoneWeightShaderMaterial(scene: Scene): ShaderMaterial {
    const shaderMaterial = new ShaderMaterial("boneWeightShader", scene, {
        vertex: "boneWeightVertexShader",
        fragment: "boneWeightFragmentShader",
    }, {
        attributes: ["position", "matricesWeights"],
        uniforms: ["worldViewProjection"],
    });

    return shaderMaterial;
}
