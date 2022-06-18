export function delayAction(func: () => void, delay: number) {
  return setTimeout(() => {
    func();
  }, delay);
}
