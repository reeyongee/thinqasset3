export const FINAL_CTA_HREF = "mailto:info@thinqasset.com";

export const FINAL_CTA_COPY = {
  title: "Speak with our team",
  subtitle:
    "Mauritius and Dubai teams — institutional fund solutions across Mauritius, DIFC, and global markets.",
  button: "Contact Us",
} as const;

export const FINAL_CTA_TOKENS = {
  muted: "rgba(184, 184, 184, 0.9)",
  btnBg: "rgba(255, 255, 255, 0.06)",
  btnBorder: "rgba(255, 255, 255, 0.08)",
  cardBorder: "rgb(34, 34, 34)",
} as const;

export type CtaArmImage = {
  src: string;
  alt: string;
};

export type CtaArm = {
  id: number;
  angle: number;
  /** Arm 8 anchors at hub top (top: 0) instead of hub center. */
  anchorY: "center" | "top";
  top: CtaArmImage;
  bottom: CtaArmImage;
};

const framer = (file: string) =>
  `https://framerusercontent.com/images/${file}`;

export const CTA_ARMS: CtaArm[] = [
  {
    id: 1,
    angle: 0,
    anchorY: "center",
    top: { src: framer("wgnJYipJll3Zy5Aj99sujMEuU.png"), alt: "" },
    bottom: { src: framer("otfOOjIX1abR2oC8hO8LPDg59Rc.png"), alt: "" },
  },
  {
    id: 2,
    angle: 15,
    anchorY: "center",
    top: { src: framer("QUuzHQ68NwZejrT2tm9GkWWCfs.jpg"), alt: "" },
    bottom: { src: framer("CfT3n8NOghssCpbhbqq07uGjeQ.jpg"), alt: "" },
  },
  {
    id: 3,
    angle: 30,
    anchorY: "center",
    top: { src: framer("qtiiq4ylWBg6n6HkE6xkszfRMU.jpg"), alt: "" },
    bottom: { src: framer("h6QNt3JCPGmyHVSKtu2FjXQrk.png"), alt: "" },
  },
  {
    id: 4,
    angle: 45,
    anchorY: "center",
    top: { src: framer("2QFUZg5KR3EqZsBaeH1IWTv3A.jpg"), alt: "" },
    bottom: { src: framer("tVfsRSp4mbHVDSHgXLFONXCfRR8.png"), alt: "" },
  },
  {
    id: 5,
    angle: 60,
    anchorY: "center",
    top: { src: framer("tV3lCdEhNbDipRwd2jLzl7AfEKA.jpg"), alt: "" },
    bottom: { src: framer("GfwYGEiQTIn2oOjzFOngF1NjwOk.png"), alt: "" },
  },
  {
    id: 6,
    angle: 75,
    anchorY: "center",
    top: { src: framer("gKrRttRIwIVyWwwF0vn3JW2sEI.png"), alt: "" },
    bottom: { src: framer("VtURR08p6egm1A6Fz4vwaINohKw.png"), alt: "" },
  },
  {
    id: 7,
    angle: 90,
    anchorY: "center",
    top: { src: framer("P9kQxXc4KGRfAl5cgxEYKcUCxXw.jpg"), alt: "" },
    bottom: { src: framer("q6BYHBPXBZG4Wj3tiyevwGy4jA.png"), alt: "" },
  },
  {
    id: 8,
    angle: 105,
    anchorY: "top",
    top: { src: framer("SrL277MFbmfb7DZSapKbLAItdg.png"), alt: "" },
    bottom: { src: framer("s6NyNwTxQAKmjrUvCuDAinHVbPo.png"), alt: "" },
  },
  {
    id: 9,
    angle: 120,
    anchorY: "center",
    top: { src: framer("WVjzq4M9tCUPIftKMF6dF1BCWA.jpg"), alt: "" },
    bottom: { src: framer("ZCklWQUuwzx6HV0GfoXnrxoP4.png"), alt: "" },
  },
  {
    id: 10,
    angle: 135,
    anchorY: "center",
    top: { src: framer("kMnTyVQHixI963Bw6Nk2ZZxc.jpg"), alt: "" },
    bottom: { src: framer("HNMhfs8wxmEtsCDVJUJNk8shyIY.png"), alt: "" },
  },
  {
    id: 11,
    angle: 150,
    anchorY: "center",
    top: { src: framer("rgYdr8CTHWsZynRagF1GTfBo9hM.png"), alt: "" },
    bottom: { src: framer("lsiVxUh1pFauhZVvWEd3iCfVnw.png"), alt: "" },
  },
  {
    id: 12,
    angle: 165,
    anchorY: "center",
    top: { src: framer("1Ow5NbwP3wEc1CBKBEEflVpNXM.png"), alt: "" },
    bottom: { src: framer("isk2qIOSCc9cgBMyWHIhhzA6Xg.png"), alt: "" },
  },
];

/** Measured on source: ~360° every 50s at fixed scroll (7.2°/s). */
export const CTA_ROTATION_DURATION_S = 50;

/** Framer inline style on circle layer. */
export const CTA_PERSPECTIVE_PX = 1200;

/** Total wheel diameter at desktop (px). */
export const CTA_WHEEL_SIZE = {
  desktop: 1200,
  tablet: 810,
  mobile: 740,
} as const;

export const CTA_CARD_SIZE = {
  desktop: 104,
  compact: 64,
} as const;
