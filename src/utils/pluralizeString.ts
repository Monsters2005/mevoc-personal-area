export function pluralizeString(arrayLength: number) {
  return `${arrayLength} ${arrayLength !== 1 ? 'words' : 'word'}`;
}
