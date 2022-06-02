type ArrayIndex = string | number | symbol;
type Result<T> = Record<ArrayIndex, T[]>;

export function sortArrayByKey<
  T extends Record<ArrayIndex, string | null | number>
>(array: T[], key: keyof T) {
  return array.reduce((acc: Result<T>, el: T) => {
    const elValue = el[key];
    if (elValue) {
      // eslint-disable-next-line
      const arr = (acc[elValue as string] = acc[elValue as string] || []);
      arr.push(el);
    }
    return acc;
  }, {} as Result<T>);
}
