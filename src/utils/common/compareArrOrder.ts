export function compareArrOrder<T>(...args: T[]) {
  const commonArr = Array.prototype.slice.call(args);
  let isEqual = true;
  commonArr.reduce((prevArr, currArr) => {
    if (JSON.stringify(currArr) === JSON.stringify(prevArr)) {
      return currArr;
    }
    isEqual = false;

    return null;
  });
  return isEqual;
}
