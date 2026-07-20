export const THINQASSET_LOGO_MASK_SRC =
  "/thinqasset-assets/thinqasset-logo-reversed.png";

export const THINQASSET_LOGO_MASK_DIMENSIONS = {
  width: 1360,
  height: 335,
} as const;

/** Last source pixel column of the mark before the wordmark gap (mask analysis). */
export const THINQASSET_LOGO_SYMBOL_END_X = 316;

export const THINQASSET_LOGO_SYMBOL_WIDTH_RATIO =
  THINQASSET_LOGO_SYMBOL_END_X / THINQASSET_LOGO_MASK_DIMENSIONS.width;

export const THINQASSET_LOGO_ALT = "THINQASSET";
