// utils/richText.js - Rich text to plain text conversion

export function stripRichTextToPlain(rich) {
  if (!rich || !Array.isArray(rich.content)) return "";
  const parts = [];
  const walk = (node) => {
    if (!node) return;
    if (node.nodeType === "text" && typeof node.value === "string") {
      parts.push(node.value);
    }
    if (Array.isArray(node.content)) node.content.forEach(walk);
  };
  rich.content.forEach(walk);
  return parts.join(" ").replace(/\s+/g, " ").trim();
}
