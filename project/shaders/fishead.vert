attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float normScale;

varying vec4 coords;

void main() {

	vec4 vertex=vec4(aVertexPosition+aVertexNormal*normScale*0.1, 1.0);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	vTextureCoord = aTextureCoord;

	coords=vertex/10.0;
}

