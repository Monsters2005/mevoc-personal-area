export function getMediaLink(fileName: string): string {
  const isValid = fileName !== '' && !/^\s*$/.test(fileName);

  return isValid ? `https://i.ibb.co/${fileName}` : ""; // TODO: add url from axios
}
