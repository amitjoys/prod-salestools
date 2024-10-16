
export function obfuscateText(text) {
  return text.split('').join('\u200B');
}