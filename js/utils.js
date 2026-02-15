// =======================
// Bezpečné parsování JSON
// =======================
export function parseJSONSafe(str) {
  try {
    return JSON.parse(str || "{}");
  } catch {
    return null;
  }
}
