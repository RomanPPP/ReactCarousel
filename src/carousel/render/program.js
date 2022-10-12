const glsl = x => x

const vert = glsl`#version 300 es
 
layout(location = 0) in vec4 a_position;
layout(location = 1) in vec3 a_normal;



uniform mat4 worldMatrix;
uniform mat4 worldViewProjection;
uniform vec3 u_lightWorldPosition;
uniform vec3 u_viewWorldPosition;

out vec3 v_normal;
out vec3 v_surfaceToLight;
out vec3 v_surfaceToView;

void main() {

    vec3 surfaceWorldPosition = (worldMatrix * a_position).xyz;
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

    vec4 pos =  worldViewProjection * a_position;
    gl_Position = pos;

    v_normal = mat3(worldMatrix) * a_normal;
    v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
      
}`
const frag = glsl`#version 300 es
precision highp float;
 



in vec3 v_normal;
in vec3 v_surfaceToView;
in vec3 v_surfaceToLight;



uniform float u_shininess;
uniform vec4 u_color;
uniform vec4 u_ambientLight;

out vec4 outColor;


void main() {

  vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  vec3 surfaceToViewDirection = normalize(v_surfaceToView);
  vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

  vec3 normal = normalize(v_normal);
  float light = dot(v_normal, surfaceToLightDirection);
  
  
  outColor =  u_color + u_ambientLight * light ;
  outColor.rgb *= light;

 
  
  
}
`
export {vert, frag}