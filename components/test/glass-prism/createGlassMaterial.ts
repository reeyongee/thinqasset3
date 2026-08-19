import * as THREE from "three";
import { PARAMS } from "./params";

function injectFresnel(material: THREE.MeshPhysicalMaterial, amount: number) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFresnel = { value: amount };
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
uniform float uFresnel;`,
      )
      .replace(
        "#include <opaque_fragment>",
        `#include <opaque_fragment>
        {
          vec3 nrm = normalize( normal );
          vec3 viewDir = normalize( vViewPosition );
          float ndv = saturate( abs( dot( nrm, viewDir ) ) );
          float fres = pow( 1.0 - ndv, 5.0 );
          vec3 rim = vec3( 0.82, 0.9, 1.0 ) * fres;
          vec3 warm = vec3( 1.0, 0.74, 0.4 ) * fres * fres;
          gl_FragColor.rgb += ( rim * 0.7 + warm * 0.35 ) * uFresnel;
        }`,
      );
  };
  material.customProgramCacheKey = () => `glass-fresnel-${amount}`;
}

export function createGlassMaterial(envMap: THREE.Texture | null) {
  const g = PARAMS.glass;

  const outer = new THREE.MeshPhysicalMaterial({
    color: g.color,
    metalness: g.metalness,
    roughness: g.roughness,
    transmission: g.transmission,
    thickness: g.thickness,
    ior: g.ior,
    attenuationColor: new THREE.Color(g.attenuationColor),
    attenuationDistance: g.attenuationDistance,
    transparent: true,
    opacity: 1,
    envMap,
    envMapIntensity: g.envMapIntensity,
    clearcoat: g.clearcoat,
    clearcoatRoughness: g.clearcoatRoughness,
    specularIntensity: g.specularIntensity,
    specularColor: new THREE.Color(0xffffff),
    side: THREE.FrontSide,
    depthWrite: true,
  });
  injectFresnel(outer, g.fresnel);

  return { outer };
}
