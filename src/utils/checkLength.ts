export function checkLength(string: string, limit: number) {
  return string.length > limit ? `${string.substring(0, limit)}...` : string;
}
