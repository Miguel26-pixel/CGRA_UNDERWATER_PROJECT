#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {

	vec4 filter = texture2D(uSampler2, vTextureCoord+vec2(timeFactor/1000.0,timeFactor/1000.0));

    vec2 textCoords = vTextureCoord;

    float sdifferent = mix(-0.5,0.5,filter.r);
    float tdifferent = mix(-0.5,0.5,filter.g);

    textCoords.s += sdifferent*0.3;
    textCoords.t += tdifferent*0.3;

    textCoords.s = clamp(textCoords.s,0.01,0.99);
    textCoords.t = clamp(textCoords.t,0.01,0.99);

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