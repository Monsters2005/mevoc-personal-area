export function mergeArrays<T>(args: T[]) {
  const commonArr = Array.prototype.slice.call(args);
  const arr = commonArr.reduce((prev, next) => prev?.concat(next));
  return arr;
}
