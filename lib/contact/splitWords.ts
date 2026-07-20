/**
 * Vorszk-style word split for GSAP headline reveals (mirrors Dd6hkqcA SplitText words mode).
 */
export function splitWords(element: HTMLElement): HTMLSpanElement[] {
  const html = element.innerHTML
    .replace(/<!--\[\-\-\>/g, "")
    .replace(/<!--\]\-\->/g, "")
    .replace(/<!---->/g, "")
    .trim();

  const parts = html.split(/(\s+)/);
  let out = "";

  for (const part of parts) {
    if (!part) continue;
    if (/^\s+$/.test(part)) {
      out += part;
      continue;
    }
    if (part.includes("<")) {
      out += part;
      continue;
    }
    out += `<span>${part}</span>`;
  }

  element.innerHTML = out;
  const spans = [...element.querySelectorAll<HTMLSpanElement>("span")];

  spans.forEach((span) => {
    const text = span.textContent ?? "";
    if (text.length > 1 && text.trim() !== "" && text !== "&" && text !== "-") {
      span.innerHTML = `${text}&nbsp;`;
    }
  });

  return spans;
}
