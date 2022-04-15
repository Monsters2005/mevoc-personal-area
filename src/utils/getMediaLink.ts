export function getMediaLink(fileName: string) {
  const isValid = fileName !== '' && !/^\s*$/.test(fileName);

  return isValid ? `https://i.ibb.co/${fileName}` : undefined; // TODO: add url from axios
}
