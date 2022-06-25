export function cloneObj<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj));
}
