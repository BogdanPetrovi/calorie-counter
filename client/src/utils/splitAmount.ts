export default function splitAmount(input: string) {
  const match = input.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/);
  if (!match) return ''
  return [match[1], match[2]];
}