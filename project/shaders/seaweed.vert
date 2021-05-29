attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

uniform float normScale;
uniform float timeFactor;

void main() {
    vTextureCoord = aTextureCoord;

    vec3 vertexPosition = aVertexPosition;
    vertexPosition.xy += sin(timeFactor * vertexPosition.y * 0.1) * vertexPosition.y;

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
}

