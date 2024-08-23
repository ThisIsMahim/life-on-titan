uniform sampler2D globeTexture;
uniform sampler2D bumpMap;
uniform float bumpScale;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
  // Sample the bump map
  vec3 bumpNormal = texture2D(bumpMap, vertexUV).rgb;
  
  // Convert from [0, 1] to [-1, 1] range
  bumpNormal = bumpNormal * 2.0 - 1.0;
  
  // Perturb the vertex normal with the bump map normal
  vec3 perturbedNormal = normalize(vertexNormal + bumpNormal * bumpScale);
  
  // Calculate the intensity of the atmosphere effect
  float intensity = 1.05 - dot(perturbedNormal, vec3(0.0, 0.0, 1.0));
  vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
  
  // Combine the atmosphere effect with the globe texture
  gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
}
