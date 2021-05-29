#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 filter = texture2D(uSampler2, vTextureCoord);

    color.r = color.r*filter.b;
    color.g = color.g*filter.b;
    color.b = color.b*filter.b;


    gl_FragColor = color;
}