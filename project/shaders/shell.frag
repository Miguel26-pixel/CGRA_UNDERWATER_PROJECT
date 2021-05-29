#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {

	vec4 filter = texture2D(uSampler2, vTextureCoord);

	vec2 textCoords = vTextureCoord;

    vec4 color = texture2D(uSampler, textCoords);

    filter = filter * 0.2;
    if(color.r > filter.r) color.r -= filter.r;
    else color.r = 0.0;
    if(color.g > filter.g) color.g -= filter.g;
    else color.g = 0.0;
    if(color.b > filter.b) color.b -= filter.b;
    else color.b = 0.0;

	gl_FragColor = color;
}