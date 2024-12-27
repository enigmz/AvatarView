import { Effect } from "@babylonjs/core";

Effect.ShadersStore["boneWeightVertexShader"] = `
    precision highp float;

    // Uniforms
    uniform mat4 worldViewProjection;

    // Attributes
    attribute vec3 position;
    attribute vec4 matricesWeights;

    // Varying
    varying vec4 vWeights;

    void main() {
        vWeights = matricesWeights; // Asegúrate de que la malla tiene matricesWeights
        gl_Position = worldViewProjection * vec4(position, 1.0);
    }
`;


Effect.ShadersStore["boneWeightFragmentShader"] = `
    precision highp float;

    // Varying
    varying vec4 vWeights;

    void main() {
        // Map the weights to colors
        vec3 color = vec3(vWeights.x, vWeights.y, vWeights.z);
        gl_FragColor = vec4(color, 1.0);
    }
`;


