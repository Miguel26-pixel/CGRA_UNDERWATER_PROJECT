#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

varying vec4 coords;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

#define NUMBER_OF_LIGHTS 8
uniform lightProperties uLight[NUMBER_OF_LIGHTS];

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	if (coords.z > 0.04)
		gl_FragColor =  vec4(0.19, 0.17, 0.33, 1.0) * uLight[0].diffuse;
	else
	{
		gl_FragColor = color;
	}
}