export const finGlobeVertexShader = /* glsl */ `
  uniform sampler2D landMaskTexture;
  uniform float displacementHeight;
  uniform float reliefScale;
  uniform float normalStrength;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;
  varying vec3 vTangent;
  varying vec3 vBitangent;
  varying float vSlopeFactor;

  float getDisp(vec2 coord) {
    float f = texture2D(landMaskTexture, coord).r;
    return f * f * displacementHeight;
  }

  void main() {
    vUv = uv;

    float disp = getDisp(uv);

    float stepU = 0.001953125;
    float stepV = 0.00390625;
    float dR = getDisp(uv + vec2(stepU, 0.0));
    float dL = getDisp(uv - vec2(stepU, 0.0));
    float dU = getDisp(uv + vec2(0.0, stepV));
    float dD = getDisp(uv - vec2(0.0, stepV));

    float ddu = (dR - dL) / (2.0 * stepU);
    float ddv = (dU - dD) / (2.0 * stepV);

    float slopeMag = length(vec2(ddu, ddv));
    vSlopeFactor = smoothstep(0.0, 2.5, slopeMag);

    vec3 T = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
    if (length(cross(normal, vec3(0.0, 1.0, 0.0))) < 0.001) {
      T = normalize(cross(normal, vec3(1.0, 0.0, 0.0)));
    }
    vec3 B = normalize(cross(normal, T));

    vec3 perturbedNormal = normalize(normal - T * ddu * normalStrength - B * ddv * normalStrength);

    vec3 displacedPos = position + normal * disp * reliefScale;

    vec4 worldPos = modelMatrix * vec4(displacedPos, 1.0);
    vWorldPos = worldPos.xyz;
    vWorldNormal = normalize((modelMatrix * vec4(perturbedNormal, 0.0)).xyz);
    vTangent = normalize((modelMatrix * vec4(T, 0.0)).xyz);
    vBitangent = normalize((modelMatrix * vec4(B, 0.0)).xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const finGlobeFragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;
  varying vec3 vTangent;
  varying vec3 vBitangent;
  varying float vSlopeFactor;

  uniform sampler2D stoneDiffuseTexture;
  uniform sampler2D stoneNormalTexture;
  uniform sampler2D stoneRoughnessTexture;
  uniform sampler2D landMaskTexture;
  uniform sampler2D goldDaymapTexture;
  uniform bool hasEnvMap;
  uniform samplerCube envMap;
  uniform vec2 stoneRepeat;

  uniform vec3 keyLightPosition;
  uniform vec3 keyLightColor;
  uniform vec3 rimLightPosition;
  uniform vec3 rimLightColor;
  uniform vec3 fillLightPosition;
  uniform vec3 fillLightColor;
  uniform vec3 ambientColor;
  uniform float lightAttenuation;
  uniform float saturation;

  const float PI = 3.14159265359;

  float distributionGGX(vec3 N, vec3 H, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH * NdotH;
    float denom = NdotH2 * (a2 - 1.0) + 1.0;
    return a2 / (PI * denom * denom);
  }

  float geometrySchlickGGX(float NdotV, float roughness) {
    float r = roughness + 1.0;
    float k = (r * r) / 8.0;
    return NdotV / (NdotV * (1.0 - k) + k);
  }

  float geometrySmith(vec3 N, vec3 V, vec3 L, float roughness) {
    return geometrySchlickGGX(max(dot(N, V), 0.0), roughness) *
           geometrySchlickGGX(max(dot(N, L), 0.0), roughness);
  }

  vec3 fresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
  }

  vec3 fresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness) {
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
  }

  vec3 calculateLight(
    vec3 lightPosition,
    vec3 lightColor,
    vec3 N,
    vec3 V,
    vec3 albedo,
    float metalness,
    float roughness,
    vec3 F0
  ) {
    vec3 L = normalize(lightPosition - vWorldPos);
    vec3 H = normalize(V + L);
    float dist = length(lightPosition - vWorldPos);
    float attenuation = 1.0 / (1.0 + lightAttenuation * dist * dist);
    vec3 radiance = lightColor * attenuation;

    float NDF = distributionGGX(N, H, roughness);
    float G = geometrySmith(N, V, L, roughness);
    vec3 F = fresnelSchlick(max(dot(H, V), 0.0), F0);

    vec3 numerator = NDF * G * F;
    float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.0001;
    vec3 specular = numerator / denominator;

    vec3 kS = F;
    vec3 kD = (1.0 - kS) * (1.0 - metalness);

    float NdotL = max(dot(N, L), 0.0);
    return (kD * albedo / PI + specular) * radiance * NdotL;
  }

  void main() {
    float field = texture2D(landMaskTexture, vUv).r;

    vec2 stoneUV = vUv * stoneRepeat;
    vec3 stoneColor = texture2D(stoneDiffuseTexture, stoneUV).rgb;
    stoneColor *= vec3(0.85, 0.82, 0.78);
    vec3 stoneNorm = texture2D(stoneNormalTexture, stoneUV).rgb * 2.0 - 1.0;
    float stoneRough = texture2D(stoneRoughnessTexture, stoneUV).r;

    vec3 goldColor = texture2D(goldDaymapTexture, vUv).rgb;
    goldColor = pow(goldColor, vec3(0.85));
    goldColor *= vec3(1.15, 1.0, 0.75);

    vec3 cliffGold = goldColor * vec3(0.78, 0.72, 0.55);

    float slope = vSlopeFactor;
    float goldMask = field;
    float cliffInfluence = slope * field;
    float transitionBand = smoothstep(0.05, 0.35, field) * (1.0 - smoothstep(0.65, 0.95, field));

    vec3 albedo = mix(stoneColor, goldColor, goldMask);
    albedo = mix(albedo, cliffGold, cliffInfluence * 0.6);

    float roughness = mix(stoneRough * 0.95 + 0.05, 0.42, goldMask);
    roughness = mix(roughness, 0.58, cliffInfluence * 0.35);
    roughness = mix(roughness, 0.78, transitionBand * 0.7);

    float metalness = mix(0.0, 0.88, goldMask);
    metalness *= (1.0 - transitionBand * 0.65);

    mat3 TBN = mat3(normalize(vTangent), normalize(vBitangent), normalize(vWorldNormal));
    vec3 mappedNormal = mix(stoneNorm, vec3(0.0, 0.0, 1.0), goldMask * 0.35);
    vec3 N = normalize(TBN * mappedNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);

    vec3 goldF0 = vec3(1.0, 0.71, 0.29);
    vec3 stoneF0 = vec3(0.04);
    vec3 F0 = mix(stoneF0, goldF0, metalness);
    F0 = mix(F0, albedo, metalness);

    vec3 Lo = vec3(0.0);
    Lo += calculateLight(keyLightPosition, keyLightColor, N, V, albedo, metalness, roughness, F0);
    Lo += calculateLight(rimLightPosition, rimLightColor, N, V, albedo, metalness, roughness, F0);
    Lo += calculateLight(fillLightPosition, fillLightColor, N, V, albedo, metalness, roughness, F0);
    Lo *= (1.0 - transitionBand * 0.45);

    vec3 envColor = vec3(0.0);
    if (hasEnvMap) {
      vec3 R = reflect(-V, N);
      envColor = textureCube(envMap, R).rgb;
    }
    vec3 F_env = fresnelSchlickRoughness(max(dot(N, V), 0.0), F0, roughness);
    float envEdgeSuppress = 1.0 - transitionBand * 0.85;
    vec3 envSpec = envColor * F_env * (1.0 - roughness) * 0.25 * envEdgeSuppress;
    vec3 envDiffuse = envColor * albedo * (1.0 - metalness) * 0.15 * (1.0 - transitionBand * 0.4);

    vec3 ambient = ambientColor * albedo * (1.0 - metalness * 0.5);
    float hemi = dot(N, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
    vec3 hemiColor = mix(vec3(0.08, 0.06, 0.04), vec3(0.18, 0.14, 0.10), hemi);
    ambient += hemiColor * albedo * 0.5;

    vec3 emissive = goldColor * goldMask * 0.08;
    float edgeBand = smoothstep(0.10, 0.40, field) * (1.0 - smoothstep(0.60, 0.90, field));
    float contactAO = 1.0 - edgeBand * 0.09;

    vec3 color = (ambient + Lo + envSpec + envDiffuse + emissive) * contactAO;

    float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
    color = mix(vec3(luma), color, saturation);

    gl_FragColor = vec4(color, 1.0);
  }
`;
