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

    
    vec2 newATextureCoord  = aTextureCoord;
    
    vec4 color = texture2D(uSampler2, newATextureCoord);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition , 1.0);
    vTextureCoord = newATextureCoord;
}

