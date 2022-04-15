export function getMediaLink(fileName: string | null) {
  return fileName !== null ? `https://i.ibb.co/${fileName}` : ' '; // TODO: add url from axios
}
